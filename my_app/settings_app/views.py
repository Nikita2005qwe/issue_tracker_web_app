from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import UserSettingsForm
from .models import UserSettings

@login_required
def settings_view(request):
    # Получаем или создаем настройки пользователя
    user_settings, created = UserSettings.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        form = UserSettingsForm(request.POST, instance=user_settings)
        if form.is_valid():
            form.save()
            return redirect('settings')  # Перенаправляем обратно на страницу настроек
    else:
        form = UserSettingsForm(instance=user_settings)

    return render(request, 'settings_app/settings.html', {'form': form})

