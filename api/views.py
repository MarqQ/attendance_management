from django.shortcuts import render
from django.http import JsonResponse


def api_overview(request):
    return JsonResponse("API ROOT", safe=False)
