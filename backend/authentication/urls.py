from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('', include(router.urls)),
    #     path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #     path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #     path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
