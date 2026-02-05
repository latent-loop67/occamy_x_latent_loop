def validate_meeting_data(data):
    meeting_type = data.get('meeting_type')

    if meeting_type == 'GROUP' and not data.get('attendees_count'):
        raise ValueError("Attendees count is required for group meetings")

    if meeting_type == 'ONE_TO_ONE' and not data.get('person_name'):
        raise ValueError("Person name is required for one-to-one meetings")
