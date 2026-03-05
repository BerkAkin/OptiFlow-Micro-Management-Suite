using MoodModule.Domain.Entities;
using MoodModule.Domain.Enums;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace MoodModule.Domain.Entities
{
    public class MiniUser
    {
        public int Id { get; private set; }
        public int TenantId { get; private set; }
        public string Username { get; private set; }
        public string Email { get; private set; }

        private readonly List<MoodRecord> _moodRecords = new();
        public IReadOnlyCollection<MoodRecord> MoodRecords => _moodRecords;

        private readonly List<Comment> _comments = new();
        public IReadOnlyCollection<Comment> Comments => _comments;

        public MiniUser(string username, string email, int tenantId)
        {
            if (string.IsNullOrWhiteSpace(username))
                throw new ArgumentException("Username cannot be empty");
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("Email cannot be empty");

            Username = username;
            Email = email;
            TenantId = tenantId;
        }

        public void AddMoodRecord(int MoodId,List<int> Tags) {

            if (Tags == null || !Tags.Any())
                throw new Exception("Tags cannot be empty");
            var tagEnums = Tags.Select(t => (TagsEnum)t).ToList();
            _moodRecords.Add(new MoodRecord(this.Id, this.TenantId, tagEnums, MoodId));
        }

        public void AddComment(string Content)
        {

            if (string.IsNullOrWhiteSpace(Content))
                throw new Exception("Fields cannot be empty");
            _comments.Add(new Comment(this.Id, this.TenantId, Content));
        }

        public void RemoveComment(int CommentId)
        {

            if (CommentId <= 0)
                throw new Exception("Invalid comment id.");

            var comment = _comments.FirstOrDefault(c => c.Id == CommentId);

            if (comment == null)
                throw new Exception("Comment not found in user's records.");

            _comments.Remove(comment);
        }

    }
}
