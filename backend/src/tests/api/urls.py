from django.urls import path

from .views import TestListView, QuestionListView, QuestionCreateView, TestCreateView, TestResultCreateView, QuestionAnswerCreateView
from .views import TestResultListView, TestDestroyView, QuestionDestroyView, TestUpdateView, QuestionUpdateView, QuestionImageListView
from .views import QuestionAnswerVariantsListView


urlpatterns = [
    path('', TestListView.as_view()),
    path('create', TestCreateView.as_view()),
    path('destroy/<pk>', TestDestroyView.as_view()),
    path('update/<pk>', TestUpdateView.as_view()),
    path('questions/', QuestionListView.as_view()),
    path('questions/create', QuestionCreateView.as_view()),
    path('questions/destroy/<pk>', QuestionDestroyView.as_view()),
    path('questions/update/<pk>', QuestionUpdateView.as_view()),
    path('questions/images/', QuestionImageListView.as_view()),
    path('questions/answer_variants/', QuestionAnswerVariantsListView.as_view()),
    path('test_results/', TestResultListView.as_view()),
    path('test_results/create', TestResultCreateView.as_view()),
    path('question_answers/create', QuestionAnswerCreateView.as_view()),
]
