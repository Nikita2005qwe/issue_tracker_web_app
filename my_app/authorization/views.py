from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.views.generic.edit import FormView
from django.urls.base import reverse_lazy
from authorization.forms import RegisterForm
from authorization.services import ActionAfterCreatingUsers


class RegisterView(FormView):
    """
    Класс для регистрации пользователей
    """
    form_class = RegisterForm
    template_name = 'registration/registration.html'
    success_url = reverse_lazy('authorization:profile')
    
    def form_valid(self, form):
        """
        Функция возвращающая провалидированную форму
        :param form: Заполненная форма
        :return: Провалидированная форма
        """
        # Сохраняем нового пользователя
        user = form.save()
        
        # Создаём для пользователя секции по умолчанию
        ActionAfterCreatingUsers.create_default_sections(user)
        
        # Авторизуем нового пользователя
        login(self.request, user)
        
        return super().form_valid(form)
