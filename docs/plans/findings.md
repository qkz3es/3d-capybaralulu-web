# Findings & Decisions

## Requirements
- `frontend` 应提供全屏 React + `@react-three/fiber` Canvas，呈现可操控的水豚角色与公园背景；
- 控件覆盖 `W/A/S/D` 移动、`Space` 跳跃、`Shift` 蹲伏、`C/V/B` 切换趴下/站立/跳舞，同时 HUD 展示当前姿态、动作与最近按键；
- 场景需包含 Sky、雾、背景几何体（远景拱门、树木、长椅）、光晕与粒子，使视觉氛围迎合“夜间公园”；
- 所有文档变动（需求、计划、进度）须集中在 `docs/plans/task_plan.md`、`findings.md`、`progress.md` 这三个文件中；

## Research Findings
- `@react-three/drei` 提供的 `Environment`、`Sky`、`Sparkles`、光照组件可快速砌出公园灯光；
- CSS 需要把 Canvas 设置为 `position:absolute` 且填满窗口，否则场景会被限制在页面顶部一小块；
- `three.js` 体积较大，`npm run build` 会反复提示 chunk 大于 500 kB（记录在 `progress.md`）；

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| 使用 React + `@react-three/fiber` + `@react-three/drei` | 让 React 主导渲染、hook 逻辑与 Canvas 生命周期。 |
| 自定义 `useKeyboardControls`/`useCapybaraState` | 统一处理输入、滑落、舞动状态与 HUD `lastAction`，避免多 handler 冲突。 |
| Camera 近距 + FOV 50 | 把角色与路径拉近，与 HUD 共同占据画面中心。 |
| Sky/雾 + 背景几何体 | 构建“公园”背景，让角色前景与后景有层次。 |
| Canvas 绝对定位 + `App` 全屏容器 | 确保 3D 空间占满窗口，HUD 叠加不阻碍交互。 |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| Chunk > 500 kB 警告 | 记录在 `progress.md`，可在未来通过 code-splitting/调整 `chunkSizeWarningLimit` 处理。 |
| `Environment` preset 报错 | 改用 `park`（drei 支持的选项之一）。 |

## Resources
- `README.md`：GitHub 展示页面与运行说明；
- `docs/brainstorming/需求.md`、`方案.md`：保留原始需求与方案；
- `frontend/src`：hook、scene、HUD 的实现参考；

## Visual/Browser Findings
- 暂无额外屏幕截图；手动测试行为需记录在 `progress.md` 的“Actions taken”与“Test Results”中。

---
*保持此文件在每次发现新问题或调整后更新。*
