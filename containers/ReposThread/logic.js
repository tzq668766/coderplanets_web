import R from 'ramda'

import { PAGE_SIZE } from '../../config'

import {
  makeDebugger,
  $solver,
  dispatchEvent,
  EVENT,
  TYPE,
  scrollIntoEle,
  asyncRes,
} from '../../utils'

import S from './schema'
import SR71 from '../../utils/network/sr71'

const sr71$ = new SR71({
  resv_event: [
    EVENT.REFRESH_REPOS,
    EVENT.PREVIEW_CLOSED,
    // EVENT.COMMUNITY_CHANGE,
  ],
})
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:ReposThread')
/* eslint-enable no-unused-vars */

let store = null

const validFilter = R.pickBy(
  R.compose(
    R.not,
    R.isEmpty
  )
)

export const inAnchor = () => store.setHeaderFix(false)
export const outAnchor = () => store.setHeaderFix(true)

export function loadRepos(page = 1) {
  const { mainPath } = store.curRoute
  const community = mainPath
  store.markState({ curView: TYPE.LOADING })

  const args = {
    filter: {
      page,
      size: PAGE_SIZE.D,
      ...store.filtersData,
      tag: store.activeTagData.raw,
      community,
    },
  }

  args.filter = validFilter(args.filter)
  scrollIntoEle(TYPE.APP_HEADER_ID)

  debug('load repos --> ', args)
  sr71$.query(S.pagedRepos, args)
  store.markRoute({ page })
}

export function onTitleSelect(repo) {
  store.setViewing({ repo })
  debug('onTitleSelect ---', repo)

  dispatchEvent(EVENT.PREVIEW_OPEN, {
    type: TYPE.PREVIEW_REPO_VIEW,
    data: repo,
  })
}

export function createContent() {
  debug('createContent')
  dispatchEvent(EVENT.PREVIEW_OPEN, { type: TYPE.PREVIEW_REPO_CREATE })
}

export function onTagSelect() {
  debug('onTagSelect')
}

export function onFilterSelect() {
  debug('onFilterSelect')
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('pagedRepos'),
    action: ({ pagedRepos }) => {
      let curView = TYPE.RESULT
      if (pagedRepos.entries.length === 0) {
        curView = TYPE.RESULT_EMPTY
      }
      store.markState({ curView, pagedRepos })
    },
  },
  {
    match: asyncRes('partialTags'),
    action: ({ partialTags: tags }) => store.markState({ tags }),
  },
  {
    match: asyncRes(EVENT.REFRESH_REPOS),
    action: () => loadRepos(),
  },
  {
    match: asyncRes(EVENT.PREVIEW_CLOSED),
    action: () => store.setViewing({ repo: {} }),
  },
]
const ErrSolver = []

const loadIfNeed = () => {
  /* loadVideos() */
  /* console.log('store.pagedVideos.entries --> ', store.pagedVideosData.entries) */
  if (R.isEmpty(store.pagedReposData.entries)) {
    loadRepos()
  }
}

export function init(_store) {
  if (store) {
    loadIfNeed()
    return false
  }
  store = _store

  debug(store)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

  loadIfNeed()
}
