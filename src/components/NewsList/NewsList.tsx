import { useNewsStore } from "../../store/news.store";
import { useState } from "react";
import { NewsItem } from "../NewsItem/NewsItem";
import styles from "./styles.module.css";
import { useShallow } from "zustand/shallow";

export const NewsList: React.FC = () => {
  const { news, deleteNews } = useNewsStore(useShallow((state) => (
    { news: state.news, deleteNews: state.deleteNews }
  )));

  const [editing, setEditing] = useState<number | null>(null);

  return (
    <div>
      <h1 className={styles.title}>News List</h1>
      <div className={styles.newsList}>
        {news.map((item) => (
          <NewsItem 
            key={item.id}
            {... item}
            editing={editing} 
            deleteNews={() => deleteNews(item.id)}
            setEditing={() => setEditing(item.id) }
            onSave={() => setEditing(null)}
          />
        ))}
        {!news.length && <p className={styles.emptyNews}>Новостей нет</p>}
      </div>
    </div>
  );
};