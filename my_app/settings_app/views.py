from .services import SettingsAppContext
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin


class SettingsAppPage(LoginRequiredMixin, TemplateView):
    template_name = 'settings.html'

    def get_context_data(self, **kwargs):
        """
        Добавляем дополнительные данные в контекст перед рендерингом шаблона.
        """
        context = super().get_context_data(**kwargs)
        context.update(SettingsAppContext.get_context_for_index_page(self.request))
        return context
    