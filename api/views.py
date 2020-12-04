from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import StudentSerializer
from .models import Student


@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'List': '/student-list/',
        'Detail View': '/student-detail/<str:pk>',
        'Create': '/student-create/',
        'Update': '/student-update/<str:pk>/',
        'Delete': '/student-delete/<str:pk>/',
    }
    return Response(api_urls)


@api_view(['GET'])
def student_list(request):
    student = Student.objects.all()
    serializer = StudentSerializer(student, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def student_detail(request, pk):
    student = Student.objects.get(id=pk)
    serializer = StudentSerializer(student, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def student_create(request):
    serializer = StudentSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
def student_update(request, pk):
    student = Student.objects.get(id=pk)
    serializer = StudentSerializer(instance=student, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def student_delete(request, pk):
    student = Student.objects.get(id=pk)
    student.delete()

    return Response('Student Deleted!')
