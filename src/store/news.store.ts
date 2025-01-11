import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INewsItem } from "../types/news";


interface NewsState {
  news: INewsItem[];
}

interface NewsActions {
  addNews: (title: string, content: string) => void;
  updateNews: (id: number, title: string, content: string) => void;
  deleteNews: (id: number) => void;
}


export const useNewsStore = create<NewsState & NewsActions>()(
  persist(
    (set) => ({
      news: [],

      addNews: (title, content) =>
        set((state) => ({
          news: [...state.news, { id: Date.now(), title, content }],
        })),

      updateNews: (id, title, content) =>
        set((state) => ({
          news: state.news.map((item) =>
            item.id === id ? { ...item, title, content } : item
          ),
        })),

      deleteNews: (id) =>
        set((state) => ({
          news: state.news.filter((item) => item.id !== id),
        })),
    }),
    {
      name: 'news-storage',
    }
  )
);