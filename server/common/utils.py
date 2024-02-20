from rest_framework import status
from rest_framework.response import Response

def success_response(data=None, message=None, status=status.HTTP_200_OK):
    response_data = {'status': 'success'}

    if message:
        response_data['message'] = message

    if data:
        response_data['data'] = data

    response = Response(response_data, status=status)

    return response

def error_response(errors=None, message=None, status=status.HTTP_500_INTERNAL_SERVER_ERROR):
    response_data = {'status': 'error'}

    if message:
        response_data['message'] = message

    if errors:
        response_data['errors'] = errors

    response = Response(response_data, status=status)

    return response
