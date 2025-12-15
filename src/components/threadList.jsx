function ThreadList({ threads }) {
  return (
    <ul className="thread-list">
      {threads.map(thread => (
        <li className="thread-item" key={thread.id}>
          <div className="thread-title">{thread.title}</div>
        </li>
      ))}
    </ul>
  );
}
export default ThreadList;