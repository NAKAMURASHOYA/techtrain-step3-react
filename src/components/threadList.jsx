import { Link } from "react-router-dom"; // Linkをインポート

function ThreadList({ threads }) {
  return (
    <ul className="thread-list">
      {threads.map(thread => (
        <li className="thread-item" key={thread.id}>
          {/* タイトルをLinkで囲む */}
          <Link to={`/threads/${thread.id}`} className="thread-link">
            <div className="thread-title">{thread.title}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default ThreadList;