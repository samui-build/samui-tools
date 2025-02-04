import { lazy } from 'react'

export const LazyAccountListFeature = lazy(() => import('./account/account-feature-list'))
export const LazyAccountDetailFeature = lazy(() => import('./account/account-feature-detail'))
export const LazyClusterFeature = lazy(() => import('./cluster/cluster-feature'))
export const LazyHeliusFeature = lazy(() => import('./helius/helius-feature'))
export const LazyHomeFeature = lazy(() => import('./home/home-feature'))
