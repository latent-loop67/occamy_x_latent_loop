from .models import Sample


def create_sample(user, validated_data):
    return Sample.objects.create(
        given_by=user,
        **validated_data
    )
