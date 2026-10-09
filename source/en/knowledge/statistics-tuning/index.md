---
{
  "title": "RL Statistics, Confidence Intervals, and Tuning Budgets",
  "description": "Seeds versus episodes, power, bootstrap, IQM, and tuning leakage.",
  "date": "2026-10-09 20:21:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "evaluation",
  "permalink": "en/knowledge/statistics-tuning/",
  "translation_path": "knowledge/statistics-tuning/",
  "notebook": {
    "slug": "statistics-tuning",
    "group": "evaluation",
    "sources": [
      "N041",
      "N050"
    ]
  },
  "layout": "post"
}
---

## Identify the statistical unit

One training seed represents one training run. More evaluation episodes of the same model reduce evaluation noise, not training variability. Transitions, checkpoints, and fragments from the same run are not independent algorithm replications. This determines the level at which error bars and resampling operate.

For independent seed-level outcomes,

$$
\bar Y=\frac1n\sum_iY_i,\qquad
s^2=\frac1{n-1}\sum_i(Y_i-\bar Y)^2,\qquad
\widehat{SE}(\bar Y)=\frac{s}{\sqrt n}.
$$

Standard deviation describes dispersion; standard error describes mean-estimation precision. A confidence interval needs its method, statistic, and sampling unit.

## Power and multiple comparisons

Significance level $\alpha$ controls type-I error; power $1-\beta$ depends on effect size, variance, sample size, test, and design. Five seeds are not a universal adequacy rule. Pilot data can inform a budget for a meaningful difference. Report effect sizes and uncertainty alongside significance.

Multiple methods, tasks, and checkpoints create selection issues. Failure to reject a null is not proof of equivalence; equivalence and noninferiority require their own margins and design.

## Aggregation across tasks

Fix reference scores before normalization. IQM averages the middle 50% of scores and reduces extreme-tail influence without removing uncertainty. Stratified bootstrap should reflect the relevant task/seed hierarchy. Generalization to new tasks additionally requires stating whether tasks themselves are sampled.

Performance profiles, threshold budgets, improvement probabilities, and per-task results complement aggregates. Learning-curve AUC needs a shared interval and integration convention.

## Tuning is a budget

Grid search evaluates a specified configuration set. Report its size, seeds per configuration, selection data, and total compute. Logarithmic scales can be more appropriate for parameters spanning orders of magnitude. Repeated test-set selection leaks information. The empirical-measure material is connected to [the probability guide](/en/knowledge/probability-measures/).

Related reading: [reporting protocols](/en/knowledge/evaluation-protocol/) and [Deep RL That Matters](/en/reading/p32/).


## Selected references from the source notes

- [Reference 1](https://online.stat.psu.edu/stat200/book/export/html/79)
- [Reference 2](https://dept.stat.lsa.umich.edu/~kshedden/introds/topics/standard_errors/)
- [Reference 3](https://web.stanford.edu/class/msande226/2025/lectures/lecture9_inference.pdf)
- [Reference 4](https://pressbooks.lib.vt.edu/introstatistics/chapter/the-central-limit-theorem-for-sample-means-averages/)
- [Reference 5](https://en.wikipedia.org/wiki/Standard_error)
- [Reference 6](https://stats.oarc.ucla.edu/other/mult-pkg/seminars/intro-power/presentation-notes/)
