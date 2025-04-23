from django.http import JsonResponse
from django.views.generic.base import TemplateView
from .services import IssueTrackerContext


class IndexView(TemplateView):
    """
    Класс для отображения главной страницы приложения.
    """
    template_name = 'issue_tracker.html'  # Указываем шаблон

    def get_context_data(self, **kwargs):
        """
        Добавляем контекст из IssueTrackerContext в шаблон.
        """
        context = super().get_context_data(**kwargs)  # Получаем базовый контекст
        # Добавляем данные из IssueTrackerContext
        context.update(IssueTrackerContext.get_context_for_index_page(self.request))
        return context

    def post(self, request, *args, **kwargs):
        # Обработка POST-запросов
        data = {
            'message': 'POST-запрос успешно обработан',
            'received_data': request.POST.dict(),
        }
        return JsonResponse(data)
