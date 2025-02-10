import { lazy } from 'react'

export const LazyAccountFeature = lazy(() => import('./account/account-feature'))
export const LazyClusterFeature = lazy(() => import('./cluster/cluster-feature'))
export const LazyDevFeature = lazy(() => import('./dev/dev-feature.tsx'))
export const LazyFilesFeature = lazy(() => import('./files/feature/files-feature.tsx'))
export const LazyHeliusFeature = lazy(() => import('./helius/helius-feature'))
export const LazyHomeFeature = lazy(() => import('./home/home-feature'))
export const LazyKeypairFeature = lazy(() => import('./keypair/keypair-feature'))
export const LazyLabelFeature = lazy(() => import('./label/label-feature'))
export const LazyMplCoreFeature = lazy(() => import('./mpl-core/mpl-core-feature.tsx'))
export const LazyTodoFeature = lazy(() => import('./todo/todo-feature'))
export const LazyTokenFeature = lazy(() => import('./token/token-feature.tsx'))
