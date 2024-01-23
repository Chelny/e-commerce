from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

# Create your tests here.
class UserApiViewTest(TestCase):
    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(email='testuser@testemail.com', password='testpassword')

        # Create a token for the user
        refresh = RefreshToken.for_user(self.user)
        self.access_token = refresh.access_token

        # Set up the API client with token authentication
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')

        # URL for the user endpoint
        self.user_url = reverse('user')

    def test_valid_signup(self):
        data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'gender': 'M',
            'birth_date': '2000-01-01',
            'email': 'john.doe@example.com',
            'password': 'Test1234!'
        }

        response = self.client.post(self.user_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_invalid_signup(self):
        # Test invalid data that should return a 400 Bad Request
        invalid_data = {
            'first_name': 'j0hn',
            'last_name': 'doe',
            'gender': '',
            'birth_date': '',
            'email': 'john.example.com',
            'password': '123abc'
        }

        response = self.client.post(self.user_url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
