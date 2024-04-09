from django.urls import path
from base.views import product_views as views
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
# )

urlpatterns = [
    path('', views.getProducts, name='products'),
    path('top/', views.getTopProducts, name='top-products'),
    path('<str:pk>/reviews/', views.createProductReview, name='create-review'),
    path('<str:pk>', views.getProduct, name='product'),
]
