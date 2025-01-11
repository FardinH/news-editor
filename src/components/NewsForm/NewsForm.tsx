import { useState } from "react";
import { useNewsStore } from "../../store/news.store";
import { INewsItem } from "../../types/news";
import styles from "./styles.module.css";
import { useShallow } from "zustand/shallow";

export const NewsForm: React.FC<{ initialData?: INewsItem; onSave?: () => void }> = ({
  initialData,
  onSave,
}) => {
 
  const { addNews, updateNews } = useNewsStore(useShallow((state) => (
    { addNews: state.addNews, updateNews: state.updateNews }
  )));

  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (initialData) {
      updateNews(initialData.id, title, content);
    } 
    else {
      addNews(title, content);
    }

    setTitle('');
    setContent('');
    onSave?.();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.newsForm}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">{initialData ? 'Update' : 'Add'}</button>
    </form>
  );
};

