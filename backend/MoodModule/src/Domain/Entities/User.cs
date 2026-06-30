using MoodModule.Domain.Enums;
using ProjectMicro.Shared.Enums;

namespace MoodModule.Domain.Entities
{
    public class User
    {
        public int Id { get; private set; }
        public string Fullname { get; private set; }
        public string Email { get; private set; }
        public IsActiveEnum IsActive { get; private set; }

        public int TenantId { get; private set; }
        public Tenant Tenant { get; private set; }

        private readonly List<MoodRecord> _moodRecords = new();
        public IReadOnlyCollection<MoodRecord> MoodRecords => _moodRecords;

        private readonly List<Comment> _comments = new();
        public IReadOnlyCollection<Comment> Comments => _comments;

        private User() { }
        public User(int tenantId, int id, string fullname, string email)
        {
            if (string.IsNullOrWhiteSpace(fullname))
                throw new ArgumentException("Username cannot be empty");
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("Email cannot be empty");

            Id = id;
            TenantId = tenantId;
            Fullname = fullname;
            Email = email;
            IsActive = IsActiveEnum.Active;
        }

        public void ChangeStatus(string fullname, string email, IsActiveEnum status)
        {
            this.IsActive = status;
            this.Email = email;
            this.Fullname = fullname;
        }

        public void AddMoodRecord(int MoodId, List<int> Tags)
        {

            if (Tags == null || !Tags.Any())
                throw new Exception("Tags cannot be empty");

            var tagEnums = Tags.Select(t => (TagsEnum)t).ToList();
            var MoodEnum = (MoodEnum)MoodId;
            _moodRecords.Add(new MoodRecord(this.Id, this.TenantId, tagEnums, MoodEnum));
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
