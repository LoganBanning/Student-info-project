# GOAL Sort the list of students by name and tag

# We have an unfiltered list of students, and a filtered list of students

# We display the filtered list of students, when either the search bar or the tag bar has a value

# Scenario 1: Type in the search bar, tag bar is empty
 # Filter the original list by name, display the filtered list

# Scenario 2: Type in the tag bar, search bar is empty
 # Filter the original list by tag, display the filtered list

# Scenario 3: Type in the search bar, tag bar has an existing search
 # Filter the existing filtered list by name, display the filtered list

# Scenario 4: Type in the tag bar, search bar has an existing search
 # Filter the existing filtered list by tag, display the filtered list


# When you search by tag
# Filter the list by tag using the original list
# Then filter the list by name if there is an existing value in the name searchbar

# When you search by name
# Filter the list by name using the original list
# Then filter the list by tag if there is an existing value in the tag searchbar
