from .models import Sale


def create_sale(user, validated_data):
    sale = Sale.objects.create(
        sold_by=user,
        **validated_data
    )
    return sale
