import { INewsItem } from "../../types/news";
import { NewsForm } from "../NewsForm/NewsForm";
import styles from "./styles.module.css";

interface NewsItemProps extends INewsItem { 
  editing: number | null;
  setEditing: () => void;
  deleteNews: () => void;
  onSave: () => void
}

export const NewsItem = ({deleteNews, setEditing, onSave, editing, ...item}: NewsItemProps) => {
  return (
    <div className={styles.newsItem}>
      <h3>{item.title}</h3>
      <p>{item.content}</p>
      <button onClick={setEditing}>Edit</button>
      <button onClick={deleteNews}>Delete</button>
      <div className={styles.editForm}>
        {editing === item.id && (
            <NewsForm
              initialData={item}
              onSave={onSave}
            />
          )}
      </div>
        
    </div>
  );
}