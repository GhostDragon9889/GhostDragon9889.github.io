---
{
  "title": "Fast Gradient-Descent Methods for Temporal-Difference Learning with Linear Function Approximation",
  "description": "MSPBE and auxiliary variables connect off-policy stability to linear-time updates.",
  "date": "2026-10-09 20:28:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "reading",
  "permalink": "en/reading/p34/",
  "translation_path": "reading/p34/",
  "notebook": {
    "slug": "p34",
    "group": "classics",
    "sources": [
      "N011"
    ]
  },
  "paper": {
    "id": "P34",
    "title": "Fast Gradient-Descent Methods for Temporal-Difference Learning with Linear Function Approximation",
    "year": "2009",
    "version": "ICML 2009; source PDF not included",
    "url": "https://icml.cc/Conferences/2009/papers/546.pdf",
    "kind": "paper",
    "topic_id": "rl-classics",
    "source_kind": "notebook",
    "supplement": false
  },
  "layout": "post"
}
---

## Fixed-policy linear evaluation

Sutton and colleagues' ICML 2009 work studies $V_\theta(s)=\phi(s)^\top\theta$. Ordinary off-policy TD with approximation can be unstable; residual-gradient approaches have distinct objective and sampling difficulties. GTD2/TDC use MSPBE and an auxiliary vector for linear-time updates.

## Projected error

With $\phi'=\phi(s')$ and $\delta=r+\gamma\theta^\top\phi'-\theta^\top\phi$, appropriately weighted expectations give

$$
A=\mathbb E[\phi(\phi-\gamma\phi')^\top],\quad b=\mathbb E[r\phi],\quad C=\mathbb E[\phi\phi^\top],\qquad
\mathrm{MSPBE}=(b-A\theta)^\top C^{-1}(b-A\theta).
$$

Explicit off-policy ratios are omitted for readability here. This is not an uncorrected arbitrary-replay recipe. Coverage, invertibility, and expectation definitions belong to the assumptions.

## Auxiliary and primary recursions

Track $w\approx C^{-1}\mathbb E[\delta\phi]$ through

$$
w\leftarrow w+\beta(\delta-\phi^\top w)\phi.
$$

Common simplified GTD2 and TDC directions are respectively $(\phi-\gamma\phi')(\phi^\top w)$ and $\delta\phi-\gamma\phi'(\phi^\top w)$. With accurate tracking, their expectations relate to the same MSPBE gradient; finite-step recursions differ.

The auxiliary recursion avoids per-step matrix inversion and a naive product of correlated single-sample estimates. Timescale and stability assumptions remain important.

## Scope of the guarantees

The notes emphasize linear complexity and off-policy stability, but the guarantees concern fixed-policy linear evaluation. They are not universal global-convergence results for neural networks, changing target policies, or control. Runtime comparisons are configuration-specific.

## Reading and a proposed check

Start with [Bellman errors and projection geometry](/en/knowledge/mdp-bellman/), then [stochastic approximation](/en/knowledge/convergence/). A Baird-style example could compare TD, residual gradients, and GTD2/TDC with explicit sampling and step sizes. No such experiment was rerun here.


## Selected references from the source notes

- [Reference 1](https://icml.cc/Conferences/2009/papers/546.pdf)
