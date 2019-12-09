from django.urls import path

from .views import TestListView, QuestionListView, QuestionCreateView, TestCreateView


urlpatterns = [
    path('', TestListView.as_view()),
    path('/create', TestCreateView.as_view()),
    path('questions/', QuestionListView.as_view()),
    path('questions/create', QuestionCreateView.as_view()),
]
