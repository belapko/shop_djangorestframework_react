from rest_framework.serializers import ModelSerializer
from .models import User


# class UserModelSerializer(ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('pk', 'username', 'email', 'date_joined', 'is_active', 'is_staff', 'is_superuser')
