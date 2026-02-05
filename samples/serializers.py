from rest_framework import serializers
from .models import Sample


class SampleSerializer(serializers.ModelSerializer):
    given_by = serializers.ReadOnlyField(source='given_by.username')

    class Meta:
        model = Sample
        fields = [
            'id',
            'given_by',
            'receiver_name',
            'receiver_category',
            'quantity',
            'purpose',
            'date_given',
            'notes',
        ]
