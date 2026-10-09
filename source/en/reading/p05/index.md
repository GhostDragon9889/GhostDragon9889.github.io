---
{
  "title": "RL²: Fast Reinforcement Learning via Slow Reinforcement Learning",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "A recurrent policy learns to explore and adapt through hidden state across episodes within a task.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p05/",
  "translation_path": "reading/p05/",
  "paper": {
    "id": "P05",
    "title": "RL²: Fast Reinforcement Learning via Slow Reinforcement Learning",
    "topic_id": "foundations",
    "year": "2016",
    "version": "1611.02779v2",
    "url": "https://arxiv.org/abs/1611.02779v2",
    "supplement": true,
    "summary_sha256": "8b60de492e3975d4d312c48eed5b2adae239a5d79d670ebdee20db6d71395b99"
  },
  "layout": "post"
}
---

## Identity and central idea

Yan Duan, John Schulman, Xi Chen, Peter L. Bartlett, Ilya Sutskever, and Pieter Abbeel proposed RL² in 2016. The notes use the 14-page **arXiv:1611.02779v2**, revised November 10, 2016, supplied as an official-source supplement. The manuscript says “Under review as a conference paper at ICLR 2017”; that wording does not establish acceptance.

**Slow outer RL learns the weights; fast inner adaptation changes recurrent hidden state.** The paper learns how to explore, remember feedback, and exploit it in new tasks sampled from a training-related distribution. “Fast” concerns adaptation sample efficiency, not milliseconds of inference or VLA control speed.

## Trials, episodes, and memory boundaries

A task is an MDP $M=(\mathcal S,\mathcal A,P,r,\rho_0,\gamma,T)$ sampled from a task distribution. A **trial** contains several episodes in the same MDP. Episode resets change initial state while retaining the task and recurrent memory. A new trial samples another MDP and clears memory.

| Boundary | Reset | Retain |
|---|---|---|
| Episode | Environment initial state | MDP, weights, hidden state |
| Trial | MDP and hidden state | Meta-trained weights |
| Outer update | Optimize weights from sampled trials | Task-distribution specification |

Clearing the GRU after every episode removes the intended learning channel; retaining it across unrelated trials changes the problem.

The feedback-aware policy can be written as:

$$
x_t=\phi(o_t,a_{t-1},r_{t-1},d_{t-1}),\qquad
h_t=\operatorname{GRU}_\theta(h_{t-1},x_t),
$$
$$
\pi_\theta(a_t\mid h_t)=\operatorname{softmax}(Wh_t+b).
$$

All experiments use 256 GRU units and discrete actions. The previous action records what was tried; reward records its outcome; the termination flag identifies an environment reset. Different histories can yield different actions under the same current observation. This is adaptation in activations, without requiring an explicit Q-table or Bayesian posterior.

## Outer optimization

The outer objective optimizes expected discounted reward across an entire trial:

$$
J(\theta)=\mathbb E_{M,\tau}
\left[\sum_{\ell=0}^{L-1}\gamma^\ell r_\ell\right].
$$

Early information gathering can pay off in later episodes. The original optimizer is **TRPO**, with recurrent value baselines and GAE, rather than PPO. At test time, weights stay fixed: reward is a forward input, not a test-time gradient update.

Long-horizon credit assignment remains difficult. Memory permits information flow but does not ensure that noisy policy gradients discover useful exploration. Interpreting the hidden task identity as a POMDP is helpful; the GRU is not required to encode an exact normalized posterior.

## Bandit and tabular-MDP evidence

Bernoulli bandits draw each arm mean from $U[0,1]$. The evaluation uses 1,000 new tasks for combinations of 5, 10, or 50 arms and 10, 100, or 500 pulls. Results are cumulative rewards, not success rates. Classical baselines receive the true prior and applicable hyperparameter tuning.

| Pulls / arms | Gittins | UCB1 | RL² |
|---|---:|---:|---:|
| 10 / 5 | 6.6 | 6.7 | 6.7 |
| 10 / 10 | 6.6 | 6.7 | 6.7 |
| 10 / 50 | 6.5 | 6.6 | 6.8 |
| 100 / 5 | 78.3 | 78.0 | 78.7 |
| 100 / 10 | 82.8 | 82.4 | 83.5 |
| 100 / 50 | 85.2 | 84.3 | 84.9 |
| 500 / 5 | 405.8 | 405.8 | 401.6 |
| 500 / 10 | 437.8 | 437.1 | 432.5 |
| 500 / 50 | 463.7 | 457.6 | 438.9 |

RL² is competitive at short budgets but loses 24.8 reward to Gittins in the hardest listed setting. Small mean differences are not automatically significant; the table uses a one-sided test at $p=0.05$. A supervised imitation experiment trains the same network to match Gittins, supporting an outer-optimization bottleneck in that setting.

Tabular tasks have ten states, five actions, and ten steps per episode. Reward means come from $\mathcal N(1,1)$ with additional unit-variance noise; transitions use a flat Dirichlet prior. RL² cumulative rewards for 10, 25, 50, 75, and 100 episodes are **156.2, 445.7, 936.1, 1428.8, and 1913.7**. Optimistic PSRL gives **144.1, 425.2, 930.7, 1449.2, and 1973.9**. The advantage reverses at longer budgets. Fixed encodings and task priors limit claims about arbitrary task families.

## Visual-maze evidence

ViZDoom supplies first-person RGB. A trial keeps the map and target fixed. Rewards are +1 at the goal, −0.001 for wall collisions, and −0.04 per step. Training uses 5×5 mazes, two episodes per trial, and at most 250 steps per episode; 1,000 training configurations and 1,000 separately generated test configurations are used. Larger 9×9 mazes permit 1,000 steps, and tests extend to five episodes.

| Episode | Small-maze length / success | Large-maze length / success |
|---|---|---|
| 1 | 52.4±1.3 / 99.3% | 180.1±6.0 / 97.1% |
| 2 | 39.1±0.9 / 99.6% | 151.8±5.9 / 96.7% |
| 3 | 42.6±1.0 / 99.7% | 169.3±6.3 / 95.8% |
| 4 | 43.5±1.1 / 99.4% | 162.3±6.4 / 95.6% |
| 5 | 43.9±1.1 / 99.6% | 169.3±6.5 / 96.1% |

Lengths include successful trajectories only; the notes retain the reported ± notation without inventing its statistical meaning. Episode-two lengths decrease by approximately 25.4% and 15.7% relative to episode one, calculated in the notes. However, the table uses the **best training run**, and later episodes do not improve monotonically. Remembering a goal and taking its optimal path are separate capabilities.

## Reproduction and research implications

Shared settings include discount 0.99, average KL limit 0.01, weight normalization, orthogonal recurrent initialization, and Xavier initialization elsewhere. Bandit/tabular runs use GAE λ=0.3 and batch 250,000, with up to 1,000/10,000 updates; visual runs use λ=0.99, batch 50,000, and up to 5,000 updates. Batch sizes must be interpreted through the sampler, not as independent-task counts. The original stack is TensorFlow/rllab, with TabulaRL baselines; the export did not verify a complete official dedicated code repository.

**Independent analysis:** meta-training cost is amortized across test tasks. Adaptation depends on task priors, budgets, and reset boundaries; long-horizon optimization and memory remain fragile. No continuous-action robot or moving-object experiment is established here. A dynamic VLA extension would need explicit history, available rewards, change distributions, and memory reset rules, with adaptation quality and runtime latency evaluated separately.

## Source references

- [Source 1](https://arxiv.org/abs/1611.02779v2)
- [Source 2](https://arxiv.org/abs/1611.02779)
- [Source 3](https://openai.com/index/rl2/)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
