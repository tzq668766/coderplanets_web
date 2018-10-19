/*
 *
 * ContentBanner
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import TimeAgo from 'timeago-react'

import DotDivider from '../DotDivider'

import {
  BannerContainer,
  BannerContentWrapper,
  PostBrief,
  Title,
  Desc,
  MarkTag,
} from './styles'

import ReactionNumbers from './ReactionNumbers'

import { makeDebugger } from '../../utils'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:ContentBanner:index')
/* eslint-enable no-unused-vars */

const ContentBanner = ({ data }) => (
  <BannerContainer>
    {R.isNil(data.id) ? null : (
      <BannerContentWrapper>
        <PostBrief>
          <Title>{data.title}</Title>
          <Desc>
            <MarkTag>精华帖</MarkTag>
            <TimeAgo datetime={data.insertedAt} locale="zh_CN" />
            <DotDivider />
            字数: {data.length}
          </Desc>
        </PostBrief>
        <ReactionNumbers data={data} />
      </BannerContentWrapper>
    )}
  </BannerContainer>
)

ContentBanner.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    insertedAt: PropTypes.string,
    updatedAt: PropTypes.string,
    views: PropTypes.number,
    favoritedCount: PropTypes.number,
    starredCount: PropTypes.number,
    viewerHasFavorited: PropTypes.bool,
    viewerHasStarred: PropTypes.bool,
  }),
}

ContentBanner.defaultProps = {
  data: {
    id: '',
    title: '',
    views: 0,
    favoritedCount: -1,
    starredCount: -1,
    viewerHasFavorited: false,
    viewerHasStarred: false,
  },
}

export default ContentBanner
