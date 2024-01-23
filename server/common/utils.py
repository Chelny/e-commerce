from django.http import JsonResponse
from rest_framework import status

def success_response(data=None, message=None, status_code=status.HTTP_200_OK):
    response_data = {'status': 'success'}

    if message:
        response_data['message'] = message

    if data is not None:
        response_data['data'] = data

    return JsonResponse(response_data, status=status_code)

def error_response(message=None, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR):
    response_data = {'status': 'error'}

    if message:
        response_data['message'] = message

    return JsonResponse(response_data, status=status_code)
