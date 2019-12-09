from rest_framework.generics import ListAPIView, CreateAPIView

from tests.models import Test, Question
from .serializers import TestSerializer, QuestionSerializer


class TestListView(ListAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer


class QuestionListView(ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class TestCreateView(CreateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer

class QuestionCreateView(CreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
