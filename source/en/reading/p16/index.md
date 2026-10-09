---
{
  "title": "Real-Time Execution of Action Chunking Flow Policies",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Prefix-guided flow inpainting overlaps inference and execution while preserving chunk continuity.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p16/",
  "translation_path": "reading/p16/",
  "paper": {
    "id": "P16",
    "title": "Real-Time Execution of Action Chunking Flow Policies",
    "topic_id": "real-time",
    "year": "2025",
    "version": "2506.07339v2",
    "url": "https://arxiv.org/abs/2506.07339v2",
    "supplement": false,
    "summary_sha256": "b980a6ca43688352427da81bd0184de512ceb2ab903fe563e507242aca016d80"
  },
  "layout": "post"
}
---

## Identity and contribution

Kevin Black, Manuel Y. Galliker, and Sergey Levine propose **Real-Time Chunking (RTC)**. The source is the 25-page **arXiv:2506.07339v2**, December 5, 2025, associated with NeurIPS 2025.

RTC overlaps inference and execution while guiding a new flow-generated chunk to agree with already committed old actions. It improves task execution without necessarily reducing inference cost: the measured model latency rises **76→97 ms**.

## Time alignment and conditional completion

Let $H$ be prediction length, $s$ update stride, $\Delta t$ control period, and $\delta$ inference latency. The paper writes $d=\lfloor\delta/\Delta t\rfloor$ for consumed control steps in a simplified timeline. Actual timestamps are still required; floor rounding is not a conservative latency bound.

Naive asynchronous switching can join incompatible modes or create position/velocity jumps. Arithmetic averaging can place a path between two valid routes and into an obstacle. RTC instead conditions generation on the aligned old plan.

The first $d$ positions are **committed** because they execute while inference runs. Later overlapping positions receive decaying guidance; the new tail is unconstrained. For $H=16,s=5,d=4$, positions 0–3 have weight one, 4–10 decay, and 11–15 have zero weight. Numerical guidance need not enforce exact equality, even though physical commitments cannot be recalled.

## Flow guidance and soft masks

A clean-endpoint estimate from one flow state is:

$$
\widehat A^1=A^\tau+(1-\tau)v_\pi(A^\tau,o_t,\tau).
$$

Using an aligned reference $Y$, temporal weights $W$, and endpoint Jacobian $J$, the guided field is:

$$
\widetilde v=v_\pi+\lambda(\tau)
J^\top\operatorname{diag}(W)(Y-\widehat A^1).
$$

A vector–Jacobian product is computed through autodifferentiation with respect to the **noisy action**, while model weights stay fixed. Backpropagation here is not online training.

Guidance strength is capped at $\beta=5$ in the reported settings. The uncapped expression is singular at an endpoint; implementations need explicit handling before producing infinities or NaNs. Large guidance can destabilize short-step integration and raise maximum acceleration.

Soft masks constrain the whole overlap, strongly near committed actions and weakly farther out. The reported exponential decay generally outperforms hard-prefix-only masks and direct overwriting. “Attention” in this explanation means constraint weighting, not an added attention network.

## Concurrent scheduling

A control thread consumes actions while a background thread performs guided inference. A mutex protects consistent snapshots of the chunk, index, and observation; a condition variable wakes inference without busy polling. **Release the lock before expensive inference**, then reacquire it for replacement and index correction based on the steps actually consumed.

A ten-entry latency history uses its maximum to estimate the next frozen prefix. The stated feasible range is $d\le s\le H-d$. A historical maximum is not a hard worst-case guarantee. Queue exhaustion, unexpectedly late results, and stale suffixes need explicit policies.

For a 20 ms cycle and 100 ms inference, approximately five old commands execute. Restarting a returned chunk from its first command would replay obsolete time positions. Holding the queue lock for that whole computation would remove concurrency. Alignment and scheduling are therefore part of algorithmic correctness.

## Experimental evidence

Kinetix evaluation covers twelve dynamic tasks with force/torque control, expert-generated data, an eight-step MLP-Mixer flow policy, and five denoising steps. Each point has **2,048 rollouts** with Wilson intervals and delays up to four steps. RTC is more robust than naive asynchronous execution, temporal ensembling, and compared BID settings; the notes do not invent exact numbers from plotted curves.

Real bimanual π₀.₅ uses fifty-step predictions, 50 Hz control, five denoising steps, and minimum stride 25. Six tasks include lighting a candle, Ethernet connection, bed making, folding, laundry, and sink loading. Ten trials per configuration total **480 episodes and approximately 28 robot hours**. Temporal ensembling at high inserted delays triggers protective stops.

The main metrics are task progress and completed-fraction/time throughput, not only complete-task success. RTC can reduce retries as well as waiting. Gains with 100/200 ms inserted delays reach the reported statistical significance.

| Model component | Baseline | RTC |
|---|---:|---:|
| Image encoding | 18 ms | 18 ms |
| VLM prefill | 44 ms | 44 ms |
| Action generation | 14 ms | 35 ms |
| Total GPU model | 76 ms | 97 ms |

RTC end-to-end timing is **108.76±2.34 ms** on the nonmobile platform and **138.98±6.71 ms** on the mobile one. Network and preprocessing explain part of the gap from GPU-only timing. Slower inference can coexist with faster task completion.

## Limits and project use

**Independent analysis:** newly observed disturbances cannot immediately change an already committed prefix. Soft masks trade continuity against prompt replanning. A weak dynamic base policy is not repaired by scheduling alone, and approximate inpainting does not certify obstacle or force constraints.

The official Kinetix repository also contains later training-time conditioning work. Bind the code version so it is not mixed into this inference-only method. An OpenPI implementation should first validate timestamps, consumption counters, lock scopes, and latency distributions, then add guidance. Report full task time, progress, success, first/second action differences, GPU timing, and sensor-to-execution timing. The source notes do not report rerun experiments.

## Source references

- [Source 1](https://arxiv.org/abs/2506.07339v2)
- [Source 2](https://papers.nips.cc/paper_files/paper/2025/hash/300ccb2187dedd4edcc07f7e76d8e553-Abstract-Conference.html)
- [Source 3](https://github.com/Physical-Intelligence/real-time-chunking-kinetix)
- [Source 4](https://pi.website/research/real_time_chunking)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
