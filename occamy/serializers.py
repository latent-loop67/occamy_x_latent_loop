import re
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "role")


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        email = validated_data["email"]

        # ROLE VIA EMAIL PATTERN
        if re.search(r"@occamy\.com$", email):
            role = "ADMIN"
        elif re.search(r"@distributor\.com$", email):
            role = "DISTRIBUTOR"
        else:
            raise serializers.ValidationError(
                "Email must end with @occamy.com or @distributor.com"
            )

        user = User.objects.create_user(
            username=validated_data["username"],
            email=email,
            password=validated_data["password"],
            role=role,
            is_active=True
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username_or_email = data["username"]
        password = data["password"]

        # Try login with username
        user = authenticate(
            username=username_or_email,
            password=password
        )

        # If failed, try email → username
        if not user:
            try:
                user_obj = User.objects.get(email=username_or_email)
                user = authenticate(
                    username=user_obj.username,
                    password=password
                )
            except User.DoesNotExist:
                user = None

        if not user:
            raise serializers.ValidationError("Invalid username/email or password")

        return user
