from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from base.serializers import ProductSerializer # Import your serializer
from django.contrib.auth.models import User
from django.shortcuts import render
from base.models import Product, Review  # Import your model
from rest_framework import status
from typing import Dict, Any
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger



# @api_view(['GET'])
# def getProducts(request):
#     query = request.query_params.get('keyword', '')
#     page = request.query_params.get('page', 1)
#
#     if query == '' or query.lower() == 'null':
#         products_queryset = Product.objects.all().order_by('-createdAt')
#     else:
#         products_queryset = Product.objects.filter(name__icontains=query).order_by('-createdAt')
#
#     paginator = Paginator(products_queryset, 3)
#
#     try:
#         page_number = int(page)
#     except ValueError:
#         page_number = 1
#
#     try:
#         products = paginator.page(page_number)
#     except PageNotAnInteger:
#         products = paginator.page(1)
#     except EmptyPage:
#         products = paginator.page(paginator.num_pages)
#
#     serializer = ProductSerializer(products, many=True)
#     return Response({
#         'products': serializer.data,
#         'page': products.number,
#         'pages': paginator.num_pages
#     })

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None or query.lower() == 'null':
        products = Product.objects.all()
    else:
        products = Product.objects.filter(
        name__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page',1)
    paginator = Paginator(products, 1)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)


    page = int(page)
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
    # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    #Review already exist
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'details':'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    elif data['rating'] == 0:
        content = {'details':'Please select Rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    else:
        review = Review.objects.create(
            user = user,
            product=product,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')

