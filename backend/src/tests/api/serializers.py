from rest_framework import serializers

from tests.models import Test, Question, TestResult, QuestionAnswer, QuestionImage, AnswerVariant, ModuleUser, TestImage


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ('__all__')


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('__all__')


class TestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResult
        fields = ('__all__')


class QuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionAnswer
        fields = ('__all__')


class QuestionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionImage
        fields = ('__all__')


class QuestionAnswerVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerVariant
        fields = ('__all__')


class ModuleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuleUser
        fields = ('__all__')


class TestImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestImage
        fields = ('__all__')
