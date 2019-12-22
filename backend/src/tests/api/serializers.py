from rest_framework import serializers

from tests.models import Test, Question, TestResult, QuestionAnswer


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ('id', 'title')


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'test', 'text', 'positionInTest', 'answerType',
                  'answerVariants', 'correctAnswerVariants')


class TestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResult
        fields = ('id', 'test', 'participantName', 'timeInSeconds', 'finishTime')


class QuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionAnswer
        fields = ('id', 'testResult', 'question', 'answerText')
