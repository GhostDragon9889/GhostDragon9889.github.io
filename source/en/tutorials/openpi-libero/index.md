---
{
  "title": "OpenPI × LIBERO: Serving, Observations, and Action Contracts",
  "description": "Use pinned upstream code to check fields, image orientation, action queues, and a single request.",
  "layout": "post",
  "date": "2026-10-09 21:13:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "engineering",
  "translation_path": "tutorials/openpi-libero/",
  "tutorial": {
    "id": "T14",
    "group": "vla",
    "references": [
      "openpi-remote",
      "openpi-libero",
      "openpi-client",
      "libero"
    ]
  }
}
---

## Separate policy and simulator environments

OpenPI remote serving separates policy dependencies from robot or simulator dependencies. Its LIBERO example includes Docker and independent-environment workflows. Follow one pinned revision's entry points and dependencies rather than merging the latest versions of every project.

The documented server entry point is:

```bash
uv run scripts/serve_policy.py --env LIBERO
```

Install the matching environment and obtain the required model resources first. Private host addresses, credentials, and display-server permissions are not reproduced. This command was not run on a target GPU here.

## Official-code supplement: shape alone cannot validate images

The reviewed `examples/libero/main.py` reads the main and wrist images, applies `[::-1, ::-1]`, makes them contiguous, resizes/pads, and converts to uint8. This belongs to that example and must not be applied blindly to another image source. State combines end-effector position, quaternion converted to axis-angle, and gripper joint positions.

| Policy field | Meaning in this example | Inspect |
|---|---|---|
| observation/image | Main camera image | Orientation, RGB, size, uint8 |
| observation/wrist_image | Wrist camera image | Camera identity and alignment |
| observation/state | Configured proprioception | Order, units, rotation representation |
| prompt | Task instruction | Task identity and update boundary |
| actions | Action chunk | Horizon, dimensions, normalization, gripper |

## Requests and action queues

```python
from openpi_client import websocket_client_policy

client = websocket_client_policy.WebsocketClientPolicy(
    host="localhost", port=8000
)
# observation must follow the selected policy's preprocessing contract.
actions = client.infer(observation)["actions"]
if actions.ndim != 2:
    raise ValueError("expected [horizon, action_dim]")
```

Construct `observation` according to the table and selected configuration. This fragment is not a standalone experiment. Inspect the actual horizon and dimensions rather than inheriting a shape from a historical diagnostic. The reviewed example queues actions, consumes a prefix according to `replan_steps`, and then replans. Reset must clear the queue and history.

## Validate one layer at a time

Check model loading, one request with finite outputs, and then action units and stopping on a fixed initial state before evaluating a suite. Record warmup, inference, transport, execution, and episode wall time separately. Connectivity, one successful task, or server latency does not establish a complete LIBERO benchmark score. Use [paired evaluation](../paired-evaluation/) to compare an outer agent with direct policy execution.
