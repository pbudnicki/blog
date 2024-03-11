export const API_ROUTES = {
  posts: 'posts',
  replies: (postId: number) => `posts/${postId}/replies`,
}
