namespace AWP.Common
{
    public static class Utilities
    {
        public static string GetFullName(string firstName, string lastName)
        {
            if (!firstName.IsEmpty() && !lastName.IsEmpty())
            {
                return $"{lastName}, {firstName}";
            }
            else if (!firstName.IsEmpty())
            {
                return lastName;
            }
            else
            {
                return firstName;
            }
        }
    }
}
