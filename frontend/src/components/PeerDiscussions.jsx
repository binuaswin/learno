import PropTypes from "prop-types";

const PeerDiscussions = ({ discussions }) => {
  return (
    <section className="peer-discussions">
      <h2>Peer Discussions</h2>
      <ul>
        {discussions.map((discussion, index) => (
          <li key={index} className="discussion-item">
            <h3>{discussion.title}</h3>
            <p>{discussion.content}</p>
            <span>Posted by {discussion.user}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

PeerDiscussions.propTypes = {
  discussions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PeerDiscussions;
