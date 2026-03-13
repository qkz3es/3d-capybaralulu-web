# Task Plan: 3D 水豚公园交互体验
## Goal
用 React + `@react-three/fiber` 构建全屏 3D 公园场景，呈现通过键盘控制的水豚、HUD 状态、动态光效与轻微粒子效果，确保体验在视觉与操作上都可复现。

## Current Phase
Phase 4

## Phases

### Phase 1: Requirements & Discovery
- [x] 了解公园+键盘控制、HUD 提示和视觉氛围的核心要求
- [x] 汇总初步概念（需求/方案文档）供构建参考
- **Status:** complete

### Phase 2: Planning & Structure
- [x] 选定 React + `@react-three/fiber`/`drei` + custom hooks 架构
- [x] 明确 Canvas/HUD 分层、光影氛围与文档流程
- [x] 生成 planning-with-files 套件（task_plan、findings、progress）
- **Status:** complete

### Phase 3: Implementation
- [x] 改写 App 以支持全屏 Canvas 与 HUD 面板
- [x] 构建 `CapybaraScene`、键盘 hook、状态机与光环/粒子效果
- [x] 增加光照、雾、Sky、背景拱门与 HUD 反馈
- **Status:** complete

### Phase 4: Testing & Verification
- [x] 运行 `npm run build` 确保代码可构建（记录 chunk-size 警告）
- [ ] 运行浏览器，手动验证跳跃/舞动/HUD 反馈（建议用户在本地运行）
- [ ] 记录任何新问题并在 `progress.md` 归档
- **Status:** in_progress

### Phase 5: Delivery
- [ ] 汇总改动至最终 README 与 docs
- [ ] 提供发布说明（功能、警告、下一步）
- [ ] 等待用户确认并收尾
- **Status:** pending

## Key Questions
1. 是否接受 three.js/drei 体积造成的 chunk-size 警告？（目前记录在 `progress.md`，可在 PR 说明继续接受或进一步拆分）
2. 还需哪些 HUD 提示或交互教学？（当前展示最近按键与状态，可扩展）

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| 采用 React + `@react-three/fiber` + `@react-three/drei` | React 状态与 Canvas 合并，`drei` 提供环境/粒子/相机封装。 |
| 全屏 Canvas + Sky/雾 + background geometry | 让“公园”景深占据画面并给角色留足空间。 |
| 自定义键盘 hook + state machine | 统一输入、舞动/趴下/站立状态，HUD 共享 `lastAction`。 |
| HUD 显示当前状态与最近按键 | 提供明确反馈，帮助用户理解控制指令。 |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| Chunk > 500 kB 警告 | 多次运行 `npm run build` | 记录在 `progress.md`，将来可 code-split 或调高 `chunkSizeWarningLimit` |

## Notes
- 继续在 `progress.md` 里更新每轮浏览器/构建结果与测试行为；
- 所有视觉/交互更新都应在 `findings.md` 记录新发现与解决思路，方便 review；
- Deliver 阶段前请补充 README（已完成）与 AGENTS/文档指引。
