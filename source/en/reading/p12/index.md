---
{
  "title": "RL Token: Bootstrapping Online RL with Vision-Language-Action Models",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "A frozen VLA supplies compact state and reference actions to a small online actor–critic.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p12/",
  "translation_path": "reading/p12/",
  "paper": {
    "id": "P12",
    "title": "RL Token: Bootstrapping Online RL with Vision-Language-Action Models",
    "topic_id": "action-policy",
    "year": "2026",
    "version": "2604.23073",
    "url": "https://arxiv.org/abs/2604.23073",
    "supplement": false,
    "summary_sha256": "3d075613bc5400d55eb8426359543b9783f1ab207b85d7d188d73a1d7effa49d"
  },
  "layout": "post"
}
---

## Identity and scope

RL Token (RLT), by Charles Xu, Jost Tobias Springenberg, Michael Equi, and colleagues at Physical Intelligence, studies precise bimanual manipulation. The source attachment has thirteen pages and no explicit arXiv revision label. The official blog is dated **March 19, 2026**; **arXiv:2604.23073** was first submitted April 24. These are different dates.

RLT compresses VLA features, freezes the VLA and compression module, and trains a **small online actor and critic** using rewards and VLA reference actions. It targets difficult stages—screwing, zip-tie threading, Ethernet insertion, and charger insertion—rather than learning complete long tasks from scratch.

## Representation and temporal interfaces

The π₀.₆ base generates $H=50$ reference steps at 50 Hz. RLT predicts and executes $C=10$ steps, with fourteen dimensions per command: a **140-dimensional actor output**. Full tasks last about 30–120 seconds; critical stages last 5–20 seconds.

A learned special token compresses final VLA features through a small Transformer:

$$
z_{\mathrm{rl}}=g_\phi([z_{1:M},e_{\mathrm{rl}}])_{M+1}.
$$

The resulting representation is **2,048-dimensional**. Because instructions are fixed per experimental task, language embeddings are omitted from compression; that does not justify dropping language in arbitrary tasks.

An autoregressive decoder reconstructs stop-gradient VLA features from the token and previous true features. The reconstruction objective itself is not RL. Task-demonstration training can combine it with the VLA action objective, after which both representation and VLA are frozen.

**Independent analysis:** reconstruction encourages an information bottleneck, but does not prove that the token is a sufficient MDP statistic or retains every reward-relevant feature.

## Chunked actor–critic and the reference prior

The critic reads $x=(z_{\mathrm{rl}},s^p)$ and a full chunk. Its target uses physical-step discounting:

$$
\widehat Q=\sum_{j=1}^{C}\gamma^{j-1}r_j
+\gamma^C\mathbb E_{a'\sim\pi}Q_{\psi'}(x',a').
$$

The implementation uses two critics, minimum-Q bootstrapping, and two critic updates per actor update. Terminations and prematurely ended chunks require consistent bootstrap masking and duration handling.

A frozen VLA supplies a reference chunk $\tilde a$. The actor predicts a Gaussian conditioned on state and that sample, with small fixed variance. Its objective is:

$$
\mathcal L_\pi=\mathbb E[-Q_\psi(x,a)
+\beta\|a-\tilde a\|_2^2].
$$

The second term preserves a useful behavioral prior. It is a sample-distance penalty, not automatically an exact distribution KL. Reference conditioning also identifies which VLA action mode should be improved. The actor predicts a complete chunk; the method is not restricted to an explicitly bounded additive residual.

Reference inputs are zeroed with **50% probability during training** to discourage copying without reading state. The BC target remains; inference always provides the reference.

## Training, takeover, and accounting

Each task starts with **one to ten hours of teleoperation demonstrations** and approximately 2,000–10,000 pretraining updates. VLA warmup fills replay. Online rollouts then compute the RL token/reference at chunk boundaries and execute actor chunks.

Humans can replace executed actions through takeover. For those samples, the corrected action also replaces the reference target, so regularization points toward the human correction. Replay mixes warmup, autonomous, and takeover data. Overlapping chunks at two-control-step stride supply about 25 training samples per second; they do not create 25 independent new interactions. Asynchronous learning uses an update/data ratio of five.

Humans choose critical-stage start states and label outcomes. Additional VLA tuning can support automatic stage handoff at evaluation. Effective data minutes exclude reset and operational overhead: roughly **five minutes of robot data can require forty minutes of total experiment time**.

## Evidence and ablations

Critical-stage evaluation uses fifty episodes per task from partially completed, randomized states. Full-task evaluation starts at home and includes earlier VLA errors. These are separate distributions and must not share an unlabeled success table.

Metrics include success, completions per ten minutes, and control steps. Increased throughput combines higher success and faster execution, rather than indicating the same factor of inference acceleration. Rewards are human-provided sparse +1 outcomes.

The paper reports up to approximately **threefold critical-stage speed improvements**. Ethernet and charger baselines are already relatively successful, so gains mainly concern speed; screwing and zip ties gain more in success. Full-task “40%” and “60% improvement” wording lacks a clear relative-versus-percentage-point definition in that sentence, so the notes do not reconstruct exact values.

For Ethernet insertion, median completion steps are **66 RLT, 146 teleoperation, and 228 VLA**. At 50 Hz these are 1.32, 2.92, and 4.56 seconds; those are converted medians for one task, not all-task means.

Replacing the RL token with frozen ImageNet ResNet-10 reduces throughput about 50%. Removing BC causes the largest individual loss. Removing reference input slows learning but can approach final performance. The single-step ablation also changes representation to ResNet-10 because full VLA inference cannot run at 50 Hz, so it does not isolate chunk length alone.

HIL-SERL, Probe-Learn-Distill, DSRL, and DAgger comparisons focus on Ethernet. HIL-SERL's poor result is affected by this 50 Hz sparse-reward setting and missing exploration bounds; it is not universal evidence against that method.

## Limits and project use

Only four tasks and a limited model family are studied. Human rewards, corrections, stage management, and resets remain necessary. Frozen vision may fail under new occlusion or camera layouts; off-policy approximation and bootstrapping errors remain.

**Independent analysis:** RLT is especially relevant when a base VLA reliably reaches the interaction region but precision or speed is inadequate. It does not directly solve continuously moving targets or stale observations; ten steps still create a 0.2-second block at 50 Hz. Dynamic integration should separately measure sensor age, computation, replanning, and performance, including whether a reference has become obsolete.

Reproduction requires actual executed actions in replay, takeover-target replacement, training-only reference dropout, aligned normalization/timestamps, $H$ versus $C$, and separate demonstration, interaction, reset, and wall-time costs. The original notes do not claim executed code or validated third-party reproductions.

## Source references

- [Source 1](https://www.pi.website/research/rlt)
- [Source 2](https://www.pi.website/download/rlt.pdf)
- [Source 3](https://arxiv.org/abs/2604.23073)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
