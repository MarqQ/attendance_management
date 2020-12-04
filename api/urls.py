from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview, name="api-overview"),
    path('student-list/', views.student_list, name="student-list"),
    path('student-detail/<str:pk>/', views.student_detail, name="student-detail"),
    path('student-create/', views.student_create, name="student-create"),
    path('student-update/<str:pk>/', views.student_update, name="student-update"),
    path('student-delete/<str:pk>/', views.student_delete, name="student-delete"),
]
