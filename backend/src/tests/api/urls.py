from django.urls import path

from .views import TestListView, QuestionListView, QuestionCreateView


urlpatterns = [
    path('', TestListView.as_view()),
    path('questions/', QuestionListView.as_view()),
    path('questions/create', QuestionCreateView.as_view()),
]
