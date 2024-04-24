import { defineStore } from 'pinia'
import { BefitDto, BefitObjectDto } from "@/types";

export const useBefitStore = defineStore('befit', {
  state: () => ({
    posts: {} as BefitObjectDto,
    likedPosts: {} as BefitObjectDto,
    dislikedPosts: {} as BefitObjectDto,
  }),
  getters: {
    postList: (state) => Object.values(state.posts),
  },
  actions: {
    async getPosts() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const result = await response.json() as BefitDto[];

      this.posts = result.reduce((acc: BefitObjectDto, cur: BefitDto) => {
        acc[cur.id] = cur;

        return acc;
      }, {} as BefitObjectDto);
    },
    toggleLikePost(id: number) {
      if (!(id in this.likedPosts)) {
        this.likedPosts[id] = this.posts[id];
        delete (this.posts as Partial<BefitObjectDto>)[id];
      } else {
        this.posts[id] = this.likedPosts[id];
        delete (this.likedPosts as Partial<BefitObjectDto>)[id];
      }
    },
    toggleDislikePost(id: number) {
      if (!(id in this.dislikedPosts)) {
        this.dislikedPosts[id] = this.posts[id];
        delete (this.posts as Partial<BefitObjectDto>)[id];
      } else {
        this.posts[id] = this.dislikedPosts[id];
        delete (this.dislikedPosts as Partial<BefitObjectDto>)[id];
      }
    }
  },
})