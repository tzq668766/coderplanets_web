import F from '../fragments'

export const post = `
  query post($id: ID!) {
    post(id: $id) {
      ${F.post}
      body
      length
      author {
        ${F.author}
        bio
        location
        achievement {
          reputation
        }
        followersCount
        followingsCount
      }
      favoritedCount
      starredCount
      communities {
        ${F.community}
      }
      tags {
        ${F.tag}
      }
    }
  }
`
export const pagedPosts = `
  query($filter: PagedArticleFilter) {
    pagedPosts(filter: $filter) {
      entries {
        ${F.post}
        digest
        commentsCount
        commentsParticipators(filter: { first: 5 }) {
          id
          nickname
          avatar
        }
        tags {
          ${F.tag}
        }
        author {
          ${F.author}
        }
      }
      ${F.pagedCounts}
    }
  }
`
