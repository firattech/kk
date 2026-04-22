(function () {
    'use strict';

    function init$7() {
      Lampa.Lang.add({
        empty: {
          ru: '',
          en: '',
          uk: '',
          be: '',
          zh: '',
          pt: '',
          bg: '',
          ro: ''
        }
      });
      Lampa.Lang.add({
        shots_modal_before_recording_txt_1: {
          ru: 'Сохраняйте свои любимые моменты и делитесь ими с другими!',
          en: 'Save your favorite moments and share them with others!',
          uk: 'Зберігайте свої улюблені моменти та діліться ними з іншими!',
          be: 'Захоўвайце свае любімыя моманты і дзяліцеся імі з іншымі!',
          zh: '保存您喜爱的时刻并与他人分享！',
          pt: 'Salve seus momentos favoritos e compartilhe-os com outras pessoas!',
          bg: 'Запазвайте любимите си моменти и ги споделяйте с други!',
          ro: 'Salvează-ți momentele preferate și împărtășește-le cu ceilalți!'
        },
        shots_modal_before_recording_txt_2: {
          ru: 'Выберите интересующий момент в видео и нажмите кнопку "Начать запись".',
          en: 'Choose the moment of interest in the video and press the "Start Recording" button.',
          uk: 'Виберіть цікавий момент у відео та натисніть кнопку "Почати запис".',
          be: 'Выберыце цікавы момант у відэа і націсніце кнопку "Пачаць запіс".',
          zh: '选择视频中的感兴趣时刻，然后按“开始录制”按钮。',
          pt: 'Escolha o momento de interesse no vídeo e pressione o botão "Iniciar Gravação".',
          bg: 'Изберете интересния момент във видеото и натиснете бутона "Започни запис".',
          ro: 'Alegeți momentul de interes din videoclip și apăsați butonul "Începeți înregistrarea".'
        },
        shots_step: {
          ru: 'Шаг',
          en: 'Step',
          uk: 'Крок',
          be: 'Крок',
          zh: '步骤',
          pt: 'Passo',
          bg: 'Стъпка',
          ro: 'Pas'
        },
        shots_start_recording: {
          ru: 'Начать запись',
          en: 'Start recording',
          uk: 'Почати запис',
          be: 'Пачаць запіс',
          zh: '开始录制',
          pt: 'Iniciar gravação',
          bg: 'Започни запис',
          ro: 'Începe înregistrarea'
        },
        shots_choice_start_point: {
          ru: 'Выбрать позицию',
          en: 'Choose position',
          uk: 'Вибрати позицію',
          be: 'Выбраць пазіцыю',
          zh: '选择位置',
          pt: 'Escolher posição',
          bg: 'Изберете позиция',
          ro: 'Alegeți poziția'
        },
        shots_modal_button_upload_start: {
          ru: 'Загрузить и сохранить запись',
          en: 'Upload and save recording',
          uk: 'Завантажити та зберегти запис',
          be: 'Загрузіць і захаваць запіс',
          zh: '上传并保存录音',
          pt: 'Carregar e salvar gravação',
          bg: 'Качи и запази записа',
          ro: 'Încărcați și salvați înregistrarea'
        },
        shots_modal_button_upload_cancel: {
          ru: 'Отменить и удалить запись',
          en: 'Cancel and delete recording',
          uk: 'Скасувати та видалити запис',
          be: 'Адмяніць і видаліць запіс',
          zh: '取消并删除录音',
          pt: 'Cancelar e excluir gravação',
          bg: 'Отмени и изтрий записа',
          ro: 'Anulează și șterge înregistrarea'
        },
        shots_modal_button_upload_again: {
          ru: 'Не удалось загрузить. Попробовать снова',
          en: 'Failed to upload. Try again',
          uk: 'Не вдалося завантажити. Спробуйте ще раз',
          be: 'Не ўдалося загрузіць. Паспрабуйце яшчэ раз',
          zh: '上传失败。 再试一次',
          pt: 'Falha ao carregar. Tente novamente',
          bg: 'Неуспешен ъплоуд. Опитай отново',
          ro: 'Încărcarea a eșuat. Încearcă din nou'
        },
        shots_modal_button_upload_complete: {
          ru: 'Хорошо',
          en: 'Done',
          uk: 'Готово',
          be: 'Гатова',
          zh: '完成',
          pt: 'Concluído',
          bg: 'Готово',
          ro: 'Finalizat'
        },
        shots_modal_short_recording_txt: {
          ru: 'Запись слишком короткая. Минимальная длина записи должна быть не менее 10 секунд.',
          en: 'The recording is too short. The minimum recording length must be at least 10 seconds.',
          uk: 'Запис занадто короткий. Мінімальна довжина запису повинна бути не менше 10 секунд.',
          be: 'Запіс занадта кароткі. Мінімальная даўжыня запісу павінна быць не менш за 10 секунд.',
          zh: '录音时间太短。 最短录音长度必须至少为10秒。',
          pt: 'A gravação é muito curta. O comprimento mínimo da gravação deve ser de pelo menos 10 segundos.',
          bg: 'Записът е твърде кратък. Минималната дължина на записа трябва да бъде поне 10 секунди.',
          ro: 'Înregistrarea este prea scurtă. Lungimea minimă a înregistrării trebuie să fie de cel puțin 10 secunde.'
        },
        shots_upload_progress_start: {
          ru: 'Получение ссылки для загрузки...',
          en: 'Getting upload link...',
          uk: 'Отримання посилання для завантаження...',
          be: 'Атрыманне спасылкі для загрузкі...',
          zh: '获取上传链接...',
          pt: 'Obtendo link de upload...',
          bg: 'Получаване на връзка за качване...',
          ro: 'Se obține link-ul de upload...'
        },
        shots_upload_progress_uploading: {
          ru: 'Загрузка записи...',
          en: 'Uploading recording...',
          uk: 'Завантаження запису...',
          be: 'Загрузка запісу...',
          zh: '正在上传录音...',
          pt: 'Carregando gravação...',
          bg: 'Качване на записа...',
          ro: 'Se încarcă înregistrarea...'
        },
        shots_upload_progress_notify: {
          ru: 'Оповещение сервиса...',
          en: 'Notifying service...',
          uk: 'Повідомлення сервісу...',
          be: 'Апавяшчэнне сэрвісу...',
          zh: '通知服务...',
          pt: 'Notificando serviço...',
          bg: 'Уведомяване на услугата...',
          ro: 'Se notifică serviciul...'
        },
        shots_upload_complete_text: {
          ru: 'Запись успешно загружена и отправлена на обработку. Вы получите уведомление, когда она будет готова.',
          en: 'The recording has been successfully uploaded and sent for processing. You will receive a notification when it is ready.',
          uk: 'Запис успішно завантажено та надіслано на обробку. Ви отримаєте повідомлення, коли він буде готовий.',
          be: 'Запіс паспяхова загружаны і адпраўлены на апрацоўку. Вы атрымаеце апавяшчэнне, калі ён будзе гатовы.',
          zh: '录音已成功上传并发送以进行处理。 准备好后，您将收到通知。',
          pt: 'A gravação foi carregada com sucesso e enviada para processamento. Você receberá uma notificação quando estiver pronta.',
          bg: 'Записът е успешно качен и изпратен за обработка. Ще получите известие, когато е готов.',
          ro: 'Înregistrarea a fost încărcată cu succes și trimisă spre procesare. Veți primi o notificare când este gata.'
        },
        shots_upload_complete_notify: {
          ru: 'Запись успешно обработана и готова к просмотру!',
          en: 'The recording has been successfully processed and is ready for viewing!',
          uk: 'Запис успішно оброблено і готовий до перегляду!',
          be: 'Запіс паспяхова апрацаваны і гатовы да прагляду!',
          zh: '录音已成功处理，可以观看！',
          pt: 'A gravação foi processada com sucesso e está pronta para visualização!',
          bg: 'Записът е успешно обработен и готов за гледане!',
          ro: 'Înregistrarea a fost procesată cu succes și este gata pentru vizionare!'
        },
        shots_upload_error_notify: {
          ru: 'Не удалось обработать запись.',
          en: 'Failed to process the recording.',
          uk: 'Не вдалося обробити запис.',
          be: 'Не ўдалося апрацаваць запіс.',
          zh: '无法处理录音。',
          pt: 'Falha ao processar a gravação.',
          bg: 'Неуспешна обработка на записа.',
          ro: 'Procesarea înregistrării a eșuat.'
        },
        shots_upload_notice_text: {
          ru: 'Обратите внимание, что после публикации запись станет доступна для просмотра всем пользователям сервиса.',
          en: 'Please note that after publication, the recording will be available for viewing by all users of the service.',
          uk: 'Зверніть увагу, що після публікації запис стане доступний для перегляду всім користувачам сервісу.',
          be: 'Звярніце ўвагу, што пасля публікації запіс стане даступны для прагляду ўсім карыстальнікам сэрвісу.',
          zh: '请注意，发布后，录音将对所有服务用户可见。',
          pt: 'Observe que, após a publicação, a gravação estará disponível para visualização por todos os usuários do serviço.',
          bg: 'Обърнете внимание, че след публикуването записа ще бъде достъпен за преглед от всички потребители на услугата.',
          ro: 'Rețineți că, după publicare, înregistrarea va fi disponibilă pentru vizionare tuturor utilizatorilor serviciului.'
        },
        shots_title_favorite: {
          ru: 'Сохраненные',
          en: 'Favorites',
          uk: 'Збережені',
          be: 'Захаваныя',
          zh: '收藏夹',
          pt: 'Favoritos',
          bg: 'Любими',
          ro: 'Favorite'
        },
        shots_title_created: {
          ru: 'Созданные',
          en: 'Created',
          uk: 'Створені',
          be: 'Створаныя',
          zh: '已创建',
          pt: 'Criado',
          bg: 'Създадени',
          ro: 'Create'
        },
        shots_title_likes: {
          ru: 'Нравится',
          en: 'Likes',
          uk: 'Подобається',
          be: 'Падабаецца',
          zh: '喜欢',
          pt: 'Curtidas',
          bg: 'Харесвания',
          ro: 'Aprecieri'
        },
        shots_title_saved: {
          ru: 'Сохранено',
          en: 'Saved',
          uk: 'Збережено',
          be: 'Захавана',
          zh: '已保存',
          pt: 'Salvo',
          bg: 'Запазено',
          ro: 'Salvate'
        },
        shots_status_error: {
          ru: 'Ошибка',
          en: 'Error',
          uk: 'Помилка',
          be: 'Памылка',
          zh: '错误',
          pt: 'Erro',
          bg: 'Грешка',
          ro: 'Eroare'
        },
        shots_status_processing: {
          ru: 'Обработка',
          en: 'Processing',
          uk: 'Обробка',
          be: 'Апрацоўка',
          zh: '处理中',
          pt: 'Processando',
          bg: 'Обработка',
          ro: 'Se procesează'
        },
        shots_status_ready: {
          ru: 'Загружено',
          en: 'Ready',
          uk: 'Завантажено',
          be: 'Загружана',
          zh: '已就绪',
          pt: 'Carregado',
          bg: 'Качено',
          ro: 'Gata'
        },
        shots_status_blocked: {
          ru: 'Заблокировано',
          en: 'Blocked',
          uk: 'Заблоковано',
          be: 'Заблакіравана',
          zh: '已封锁',
          pt: 'Bloqueado',
          bg: 'Блокирано',
          ro: 'Blocat'
        },
        shots_status_deleted: {
          ru: 'Удалено',
          en: 'Deleted',
          uk: 'Видалено',
          be: 'Выдалена',
          zh: '已删除',
          pt: 'Excluído',
          bg: 'Изтрито',
          ro: 'Șters'
        },
        shots_modal_error_recording_txt_1: {
          ru: 'Не удалось начать запись.',
          en: 'Failed to start recording.',
          uk: 'Не вдалося почати запис.',
          be: 'Не ўдалося пачаць запіс.',
          zh: '无法开始录制。',
          pt: 'Falha ao iniciar a gravação.',
          bg: 'Неуспешно стартиране на записа.',
          ro: 'Pornirea înregistrării a eșuat.'
        },
        shots_modal_error_recording_txt_2: {
          ru: 'Попробуйте сменить источник видео на другой и повторить попытку.',
          en: 'Try changing the video source to another and try again.',
          uk: 'Спробуйте змінити джерело відео на інше та повторіть спробу.',
          be: 'Паспрабуйце змяніць крыніцу відэа на іншую і паспрабуйце яшчэ раз.',
          zh: '尝试将视频源更改为另一个并重试。',
          pt: 'Tente alterar a fonte de vídeo para outra e tente novamente.',
          bg: 'Опитайте да смените видео източника на друг и опитайте отново.',
          ro: 'Încercați să schimbați sursa video și reîncercați.'
        },
        shots_button_good: {
          ru: 'Хорошо',
          en: 'Done',
          uk: 'Готово',
          be: 'Гатова',
          zh: '完成',
          pt: 'Concluído',
          bg: 'Готово',
          ro: 'Gata'
        },
        shots_button_report: {
          ru: 'Подать жалобу',
          en: 'Report',
          uk: 'Поскаржитися',
          be: 'Паскардзіцца',
          zh: '举报',
          pt: 'Denunciar',
          bg: 'Докладвай',
          ro: 'Raportează'
        },
        shots_button_delete_video: {
          ru: 'Удалить запись',
          en: 'Delete recording',
          uk: 'Видалити запис',
          be: 'Видаліць запіс',
          zh: '删除录音',
          pt: 'Excluir gravação',
          bg: 'Изтрий записа',
          ro: 'Șterge înregistrarea'
        },
        shots_modal_report_txt_1: {
          ru: 'Вы уверены, что хотите подать жалобу на это video?',
          en: 'Are you sure you want to report this video?',
          uk: 'Ви впевнені, що хочете подати скаргу на це відео?',
          be: 'Вы ўпэўненыя, што хочаце паскардзіцца на гэта відэа?',
          zh: '您确定要举报此视频吗？',
          pt: 'Tem certeza de que deseja denunciar este vídeo?',
          bg: 'Сигурни ли сте, че искате да докладвате това видео?',
          ro: 'Sigur doriți să raportați acest videoclip?'
        },
        shots_modal_report_txt_2: {
          ru: 'Видео имеет нецензурное содержание, насилие или другие неприемлемые материалы.',
          en: 'The video contains obscene content, violence, or other unacceptable materials.',
          uk: 'Відео містить непристойний контент, насильство або інші неприйнятні матеріали.',
          be: 'Відэа змяшчае непрыстойны кантэнт, гвалт або іншыя непрымальныя матэрыялы.',
          zh: '该视频包含淫秽内容、暴力或其他不可接受的材料。',
          pt: 'O vídeo contém conteúdo obsceno, violência ou outros materiais inaceitáveis.',
          bg: 'Видеото съдържа непристойно съдържание, насилие или други неприемливи материали.',
          ro: 'Videoclipul conține limbaj obscen, violență sau alte materiale inacceptabile.'
        },
        shots_modal_report_txt_3: {
          ru: 'После подачи жалобы данное видео получит штрафные баллы. При накоплении определенного количества штрафных баллов видео будет удалено.',
          en: 'After reporting, this video will receive penalty points. Upon accumulating a certain number of penalty points, the video will be deleted.',
          uk: 'Після подання скарги це відео отримає штрафні бали. При накопиченні певної кількості штрафних балів відео буде видалено.',
          be: 'Пасля падачы скаргі гэта відэа атрымае штрафныя балы. Пры назапашванні пэўнай колькасці штрафных балаў відэа будзе выдалена.',
          zh: '举报后，该视频将获得处罚分数。 累积一定数量的处罚分数后，视频将被删除。',
          pt: 'Após a denúncia, este vídeo receberá pontos de penalidade. Ao acumular um certo número de pontos de penalidade, o vídeo será excluído.',
          bg: 'След докладването това видео ще получи наказателни точки. При натрупване на определен брой наказателни точки видеото ще бъде изтрито.',
          ro: 'După raportare, acest videoclip va primi puncte de penalizare. La acumularea unui anumit număr de puncte, videoclipul va fi șters.'
        },
        shots_modal_report_bell: {
          ru: 'Жалоба отправлена',
          en: 'Report submitted',
          uk: 'Скарга надіслана',
          be: 'Скарга адпраўлена',
          zh: '举报已提交',
          pt: 'Denúncia enviada',
          bg: 'Докладът е изпратен',
          ro: 'Raportul a fost trimis'
        },
        shots_modal_report_bell_alreadyed: {
          ru: 'Вы уже подавали жалобу на это видео',
          en: 'You have already reported this video',
          uk: 'Ви вже подавали скаргу на це відео',
          be: 'Вы ўжо падавалі скаргу на гэта відэа',
          zh: '您已举报此视频',
          pt: 'Você já denunciou este vídeo',
          bg: 'Вече сте докладвали това видео',
          ro: 'Ați raportat deja acest videoclip'
        },
        shots_modal_deleted_bell: {
          ru: 'Запись успешно удалена',
          en: 'Recording successfully deleted',
          uk: 'Запис успішно видалено',
          be: 'Запіс паспяхова выдалены',
          zh: '录音已成功删除',
          pt: 'Gravação excluída com sucesso',
          bg: 'Записът е успешно изтрит',
          ro: 'Înregistrarea a fost ștearsă cu succes'
        },
        shots_modal_delete_txt_1: {
          ru: 'Вы уверены, что хотите удалить эту запись?',
          en: 'Are you sure you want to delete this recording?',
          uk: 'Ви впевнені, що хочете видалити цей запис?',
          be: 'Вы ўпэўненыя, што хочаце выдаліць гэты запіс?',
          zh: '您确定要删除此录音吗？',
          pt: 'Tem certeza de que deseja excluir esta gravação?',
          bg: 'Сигурни ли сте, че искате да изтриете този запис?',
          ro: 'Sigur doriți să ștergeți această înregistrare?'
        },
        shots_modal_delete_txt_2: {
          ru: 'Запись будет удалена навсегда и не сможет быть восстановлена.',
          en: 'The recording will be permanently deleted and cannot be recovered.',
          uk: 'Запис буде назавжди видалено і не може бути відновлено.',
          be: 'Запіс будзе назаўжды выдалены і не можа быць адноўлены.',
          zh: '录音将被永久删除，无法恢复。',
          pt: 'A gravação será excluída permanentemente e não poderá ser recuperada.',
          bg: 'Записът ще бъде изтрит завинаги и не може да бъде възстановен.',
          ro: 'Înregistrarea va fi ștearsă definitiv și nu poate fi recuperată.'
        },
        shots_modal_quota_txt_1: {
          ru: 'Не торопитесь записывать новый момент!',
          en: 'Don\'t rush to record a new moment!',
          uk: 'Не поспішайте записувати новий момент!',
          be: 'Не спяшайцеся запісваць новы момант!',
          zh: '不要急于记录新时刻！',
          pt: 'Não se apresse para gravar um novo momento!',
          bg: 'Не бързайте да записвате нов момент!',
          ro: 'Nu vă grăbiți să înregistrați un moment nou!'
        },
        shots_modal_quota_txt_2: {
          ru: 'Действуются ограничения на частоту записи, чтобы избежать перегрузки сервиса. Вам нужно подождать еще {time}',
          en: 'There are restrictions on the frequency of recording to avoid overloading the service. You need to wait another {time}',
          uk: 'Існують обмеження на частоту запису, щоб уникнути перевантаження сервісу. Вам потрібно почекати ще {time}',
          be: 'Існуюць абмежаванні на частату запісу, каб пазбегнуць перагрузкі сэрвісу. Вам трэба пачакаць яшчэ {time}',
          zh: '对录音频率有一定限制，以避免服务过载。 您需要再等 {time}',
          pt: 'Existem restrições na frequência de gravação para evitar sobrecarregar o serviço. Você precisa esperar mais {time}',
          bg: 'Има ограничения за честотата на запис, за да се избегне претоварване на услугата. Трябва да изчакате още {time}',
          ro: 'Există restricții privind frecvența înregistrărilor. Trebuie să mai așteptați {time}'
        },
        shots_modal_before_upload_recording_txt_1: {
          ru: 'Будьте ориганальны!',
          en: 'Be original!',
          uk: 'Будьте оригінальними!',
          be: 'Будзьце арыгінальнымі!',
          zh: '要有创意！',
          pt: 'Seja original!',
          bg: 'Бъдете оригинални!',
          ro: 'Fii original!'
        },
        shots_modal_before_upload_recording_txt_2: {
          ru: 'Похоже, вы записали "титры" в начале или в конце фильма. Если это так, то пожалуйста, выберите другой фрагмент видео для записи.',
          en: 'It looks like you recorded the "credits" at the beginning or end of the movie. If so, please choose another video fragment to record.',
          uk: 'Схоже, ви записали "титри" на початку або в кінці фільму. Якщо так, будь ласка, виберіть інший фрагмент відео для запису.',
          be: 'Падаецца, вы запісалі "трэйлер" на пачатку або ў канцы фільма. Калі так, калі ласка, выберыце іншы фрагмент відэа для запісу.',
          zh: '看起来您在电影的开头或结尾录制了“片尾字幕”。 如果是这样，请选择另一个视频片段进行录制。',
          pt: 'Parece que você gravou os "créditos" no início ou no final do filme. Se for esse o caso, escolha outro fragmento de vídeo para gravar.',
          bg: 'Изглежда сте записали "титрите" в началото или в края на филма. Ако е така, моля изберете друг фрагмент от видеото за запис.',
          ro: 'Se pare că ați înregistrat „creditele” la începutul sau sfârșitul filmului. Dacă da, vă rugăm să alegeți un alt fragment video pentru înregistrare.'
        },
        shots_button_choice_fragment: {
          ru: 'Выбрать другой фрагмент',
          en: 'Choose another fragment',
          uk: 'Вибрати інший фрагмент',
          be: 'Выбраць іншы фрагмент',
          zh: '选择另一个片段',
          pt: 'Escolher outro fragmento',
          bg: 'Избери друг фрагмент',
          ro: 'Alege un alt fragment'
        },
        shots_button_continue_upload: {
          ru: 'Продолжить загрузку',
          en: 'Continue uploading',
          uk: 'Продовжити завантаження',
          be: 'Працягнуць загрузку',
          zh: '继续上传',
          pt: 'Continuar enviando',
          bg: 'Продължи качването',
          ro: 'Continuați încărcarea'
        },
        shots_recording_text: {
          ru: 'Идет запись',
          en: 'Recording in progress',
          uk: 'Йде запис',
          be: 'Ідзе запіс',
          zh: '正在录制',
          pt: 'Gravação em andamento',
          bg: 'Записът е в ход',
          ro: 'Înregistrare în curs'
        },
        shots_watch: {
          ru: 'Смотреть нарезки',
          en: 'Watch shots',
          uk: 'Дивитися нарізки',
          be: 'Глядзець нарэзкі',
          zh: '观看片段',
          pt: 'Assistir trechos',
          bg: 'Гледайте нарязки',
          ro: 'Vizionează clipuri'
        },
        shots_down: {
          ru: 'Нажми вниз',
          en: 'Press down',
          uk: 'Натисни вниз',
          be: 'Націсні ўніз',
          zh: '按下',
          pt: 'Pressione para baixo',
          bg: 'Натисни надолу',
          ro: 'Apasă jos'
        },
        shots_how_create_video_title: {
          ru: 'Как создать видео',
          en: 'How to create a video',
          uk: 'Як створити відео',
          be: 'Як стварыць відэа',
          zh: '如何创建视频',
          pt: 'Como criar um vídeo',
          bg: 'Как да създадете видео',
          ro: 'Cum să creezi un videoclip'
        },
        shots_how_create_video_subtitle: {
          ru: 'Посмотреть инструкцию по созданию видео',
          en: 'View instructions for creating a video',
          uk: 'Переглянути інструкцію зі створення відео',
          be: 'Паглядзець інструкцію па стварэнні відэа',
          zh: '查看创建视频的说明',
          pt: 'Ver instrucciones para criar um vídeo',
          bg: 'Вижте инструкциите за създаване на видео',
          ro: 'Vezi instrucțiunile pentru crearea unui videoclip'
        },
        shots_card_empty_descr: {
          ru: 'Здесь пока нет шотов, но вы можете создать первый!',
          en: 'There are no shots here yet, but you can create the first one!',
          uk: 'Тут поки немає шотів, але ви можете створити перший!',
          be: 'Тут пакуль няма шотаў, але вы можете стварыць першы!',
          zh: '这里还没有镜头，但您可以创建第一个！',
          pt: 'Ainda não há trechos aqui, mas você pode criar o primeiro!',
          bg: 'Тук все още няма нарязки, но можете да създадете първия!',
          ro: 'Nu există clipuri aici, dar poți să-l creezi pe primul!'
        },
        shots_alert_noshots: {
          ru: 'Шотов пока нет',
          en: 'No shots yet',
          uk: 'Шотів поки немає',
          be: 'Шотаў пакуль няма',
          zh: '还没有镜头',
          pt: 'Ainda não há trechos',
          bg: 'Все още няма нарязки',
          ro: 'Niciun clip încă'
        },
        shots_choice_tags: {
          ru: 'Вы можете выбрать теги:',
          en: 'You can choose tags:',
          uk: 'Ви можете вибрати теги:',
          be: 'Вы можаце выбраць тэгаў:',
          zh: '您可以选择标签：',
          pt: 'Você pode escolher tags:',
          bg: 'Можете да изберете тагове:',
          ro: 'Puteți alege etichete:'
        },
        shots_tag_action: {
          ru: 'Экшен',
          en: 'Action',
          uk: 'Екшен',
          be: 'Экшн',
          zh: '动作',
          pt: 'Ação',
          bg: 'Екшън',
          ro: 'Acțiune'
        },
        shots_tag_comedy: {
          ru: 'Юмор',
          en: 'Humor',
          uk: 'Гумор',
          be: 'Гумар',
          zh: '幽默',
          pt: 'Humor',
          bg: 'Хумор',
          ro: 'Umor'
        },
        shots_tag_drama: {
          ru: 'Драма',
          en: 'Drama',
          uk: 'Драма',
          be: 'Драма',
          zh: '戏剧',
          pt: 'Drama',
          bg: 'Драма',
          ro: 'Dramă'
        },
        shots_tag_horror: {
          ru: 'Ужасы',
          en: 'Horror',
          uk: 'Ужаси',
          be: 'Ужасы',
          zh: '恐怖',
          pt: 'Horror',
          bg: 'Ужас',
          ro: 'Groază'
        },
        shots_tag_thriller: {
          ru: 'Триллер',
          en: 'Thriller',
          uk: 'Трилер',
          be: 'Трылер',
          zh: '惊悚',
          pt: 'Thriller',
          bg: 'Трилър',
          ro: 'Thriller'
        },
        shots_tag_anime: {
          ru: 'Аниме',
          en: 'Anime',
          uk: 'Аніме',
          be: 'Анімэ',
          zh: '动漫',
          pt: 'Anime',
          bg: 'Аниме',
          ro: 'Anime'
        },
        shots_tag_fantasy: {
          ru: 'Фэнтези',
          en: 'Fantasy',
          uk: 'Фентезі',
          be: 'Фэнтэзі',
          zh: '奇幻',
          pt: 'Fantasia',
          bg: 'Фентъзи',
          ro: 'Fantezie'
        },
        shots_tag_sci_fi: {
          ru: 'Фантастика',
          en: 'Sci-Fi',
          uk: 'Фантастика',
          be: 'Фантастыка',
          zh: '科幻',
          pt: 'Ficção Científica',
          bg: 'Фантастика',
          ro: 'Ficțiune Științifică'
        },
        shots_settings_in_player: {
          ru: 'Показывать моменты в плеере',
          en: 'Show moments in player',
          uk: 'Показувати моменти в плеєрі',
          be: 'Паказваць моманты ў плееры',
          zh: '在播放器中显示镜头',
          pt: 'Mostrar momentos no player',
          bg: 'Показване на моменти в плейъра',
          ro: 'Afișați momentele în player'
        },
        shots_settings_in_card: {
          ru: 'Показывать кнопку Shots в карточках',
          en: 'Show Shots button in cards',
          uk: 'Показувати кнопку Shots в картках',
          be: 'Паказваць кнопку Shots у картках',
          zh: '在卡片中显示 Shots 按钮',
          pt: 'Mostrar botão Shots em cartões',
          bg: 'Показване на бутон Shots в картите',
          ro: 'Afișați butonul Shots în carduri'
        },
        shots_watch_roll: {
          ru: 'Смотреть ленту',
          en: 'Watch roll',
          uk: 'Дивитися стрічку',
          be: 'Глядзець стужку',
          zh: '观看卷',
          pt: 'Assistir rolo',
          bg: 'Гледайте ролка',
          ro: 'Vizionați ruloul'
        },
        shots_choose_tags_select: {
          ru: 'Или выберите теги',
          en: 'Or choose tags',
          uk: 'Або виберіть теги',
          be: 'Або выберите теги',
          zh: '或者选择标签',
          pt: 'Ou escolha tags',
          bg: 'Или выберите теги',
          ro: 'Sau alegeți etichete'
        },
        shots_watch_tags: {
          ru: 'Смотреть по тегам',
          en: 'Watch by tags',
          uk: 'Дивитися за тегами',
          be: 'Глядзець па тэгах',
          zh: '按标签观看',
          pt: 'Assistir por tags',
          bg: 'Гледайте по тагове',
          ro: 'Vizionați după etichete'
        },
        shots_alert_no_tags: {
          ru: 'Выберите хотя бы один тег',
          en: 'Please select at least one tag',
          uk: 'Будь ласка, виберіть хоча б один тег',
          be: 'Калі ласка, выберыце хаця б адзін тэг',
          zh: '请至少选择一个标签',
          pt: 'Por favor, selecione pelo menos uma tag',
          bg: 'Моля, изберете поне един таг',
          ro: 'Vă rugăm să selectați cel puțin un eticheta'
        },
        shots_player_recorder_rewind_text: {
          ru: 'Перемотать назад',
          en: 'Rewind',
          uk: 'Перемотати назад',
          be: 'Пераматаць назад',
          zh: '倒带',
          pt: 'Rebobinar',
          bg: 'Върни назад',
          ro: 'Derulați înapoi'
        },
        shots_player_recorder_forward_text: {
          ru: 'Перемотать вперед',
          en: 'Fast forward',
          uk: 'Перемотати вперед',
          be: 'Пераматаць наперад',
          zh: '快进',
          pt: 'Avançar',
          bg: 'Напред',
          ro: 'Derulați înainte'
        },
        shots_player_recorder_stop_text: {
          ru: 'Остановить запись',
          en: 'Stop recording',
          uk: 'Зупинити запис',
          be: 'Спыніць запіс',
          zh: '停止录制',
          pt: 'Parar gravação',
          bg: 'Спиране на записа',
          ro: 'Opriți înregistrarea'
        }
      });
    }
    var Lang = {
      init: init$7
    };

    function init$6() {
      Lampa.Template.add('shots_player_record_button', "\n        <div class=\"button selector shots-player-button\" data-controller=\"player_panel\">\n            <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <circle cx=\"11.718\" cy=\"11.718\" r=\"10.718\" stroke=\"white\" stroke-width=\"2\"/>\n                <circle cx=\"11.718\" cy=\"11.718\" r=\"5.92621\" fill=\"white\" class=\"rec\"/>\n            </svg>\n        </div>\n    ");
      Lampa.Template.add('shots_modal_before_recording', "\n        <div class=\"about\">\n            <div style=\"font-size: 1.2em;\">\n                #{shots_modal_before_recording_txt_1}\n            </div>\n            <div>\n                <svg class=\"shots-svg-auto shots-svg-auto--helmet\"><use xlink:href=\"#sprite-shots-howneed\"></use></svg>\n            </div>\n            <div>\n                #{shots_modal_before_recording_txt_2}\n            </div>\n        </div>\n    ");
      Lampa.Template.add('shots_modal_before_upload_recording', "\n        <div class=\"about\">\n            <div style=\"font-size: 1.2em;\">\n                #{shots_modal_before_upload_recording_txt_1}\n            </div>\n            <div>\n                <svg class=\"shots-svg-auto shots-svg-auto--helmet\"><use xlink:href=\"#sprite-shots-notitles\"></use></svg>\n            </div>\n            <div>\n                #{shots_modal_before_upload_recording_txt_2}\n            </div>\n        </div>\n    ");
      Lampa.Template.add('shots_modal_error_recording', "\n        <div class=\"about\">\n            <div style=\"font-size: 1.2em;\">\n                #{shots_modal_error_recording_txt_1}\n            </div>\n            <div>\n                #{shots_modal_error_recording_txt_2}\n            </div>\n        </div>\n    ");
      Lampa.Template.add('shots_modal_report', "\n        <div class=\"about\">\n            <div style=\"font-size: 1.2em;\">\n                #{shots_modal_report_txt_1}\n            </div>\n            <div>\n                #{shots_modal_report_txt_2}\n            </div>\n            <div>\n                #{shots_modal_report_txt_3}\n            </div>\n        </div>\n    ");
      Lampa.Template.add('shots_modal_delete', "\n        <div class=\"about\">\n            <div style=\"font-size: 1.2em;\">\n                #{shots_modal_delete_txt_1}\n            </div>\n            <div>\n                #{shots_modal_delete_txt_2}\n            </div>\n        </div>\n    ");
      Lampa.Template.add('shots_modal_quota_limit', "\n        <div class=\"about\">\n            <div style=\"font-size: 1.2em;\">\n                #{shots_modal_quota_txt_1}\n            </div>\n            <div>\n                #{shots_modal_quota_txt_2}\n            </div>\n        </div>\n    ");
      Lampa.Template.add('shots_modal_short_recording', "\n        <div class=\"about\">\n            <div>\n                #{shots_modal_short_recording_txt}\n            </div>\n        </div>\n    ");
      Lampa.Template.add('shots_player_recorder', "\n        <div class=\"shots-player-recorder\">\n            <div class=\"shots-player-recorder__body\">\n                <div class=\"shots-player-recorder__plate\">\n                    <div class=\"shots-player-recorder__text\">#{shots_recording_text} <span></span></div>\n                    <div class=\"shots-player-recorder__button selector shots-player-recorder__rewind\">\n                        <svg width=\"35\" height=\"24\" viewBox=\"0 0 35 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M14.75 10.2302C13.4167 11 13.4167 12.9245 14.75 13.6943L32 23.6536C33.3333 24.4234 35 23.4612 35 21.9216L35 2.00298C35 0.463381 33.3333 -0.498867 32 0.270933L14.75 10.2302Z\" fill=\"currentColor\"/>\n                            <path d=\"M1.75 10.2302C0.416665 11 0.416667 12.9245 1.75 13.6943L19 23.6536C20.3333 24.4234 22 23.4612 22 21.9216L22 2.00298C22 0.463381 20.3333 -0.498867 19 0.270933L1.75 10.2302Z\" fill=\"currentColor\"/>\n                            <rect width=\"6\" height=\"24\" rx=\"2\" transform=\"matrix(-1 0 0 1 6 0)\" fill=\"currentColor\"/>\n                        </svg>\n                        <div>#{shots_player_recorder_rewind_text}</div>\n                    </div>\n                    <div class=\"shots-player-recorder__button selector shots-player-recorder__forward\">\n                        <svg width=\"35\" height=\"24\" viewBox=\"0 0 35 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M20.25 10.2302C21.5833 11 21.5833 12.9245 20.25 13.6943L3 23.6536C1.66666 24.4234 -6.72981e-08 23.4612 0 21.9216L8.70669e-07 2.00298C9.37967e-07 0.463381 1.66667 -0.498867 3 0.270933L20.25 10.2302Z\" fill=\"currentColor\"/>\n                            <path d=\"M33.25 10.2302C34.5833 11 34.5833 12.9245 33.25 13.6943L16 23.6536C14.6667 24.4234 13 23.4612 13 21.9216L13 2.00298C13 0.463381 14.6667 -0.498867 16 0.270933L33.25 10.2302Z\" fill=\"currentColor\"/>\n                            <rect x=\"29\" width=\"6\" height=\"24\" rx=\"2\" fill=\"currentColor\"/>\n                        </svg>\n                        <div>#{shots_player_recorder_forward_text}</div>\n                    </div>\n                    <div class=\"shots-player-recorder__button selector shots-player-recorder__stop\">\n                        <svg width=\"19\" height=\"25\" viewBox=\"0 0 19 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <rect width=\"6\" height=\"25\" rx=\"2\" fill=\"currentColor\"/>\n                            <rect x=\"13\" width=\"6\" height=\"25\" rx=\"2\" fill=\"currentColor\"/>\n                        </svg>\n                        <div>#{shots_player_recorder_stop_text}</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ");
      Lampa.Template.add('shots_modal_upload', "\n        <div class=\"shots-modal-upload\">\n            <div class=\"shots-modal-upload__preview\"></div>\n            <div class=\"shots-modal-upload__body\"></div>\n        </div>\n    ");
      Lampa.Template.add('shots_checkbox', "\n        <div class=\"shots-selector shots-checkbox selector\">\n            <div class=\"shots-checkbox__icon\"></div>\n            <div class=\"shots-checkbox__text\">{text}</div>\n        </div>\n    ");
      Lampa.Template.add('shots_button', "\n        <div class=\"shots-selector shots-button selector\">{text}</div>\n    ");
      Lampa.Template.add('shots_progress', "\n        <div class=\"shots-selector shots-progress selector\">\n            <div class=\"shots-progress__text\">{text}</div>\n            <div class=\"shots-progress__bar\"><div></div></div>\n        </div>\n    ");
      Lampa.Template.add('shots_preview', "\n        <div class=\"shots-preview\">\n            <div class=\"shots-preview__left\">\n                <div class=\"shots-preview__screenshot\">\n                    <img>\n                </div>\n            </div>\n            <div class=\"shots-preview__body\">\n                <div class=\"shots-preview__year\">{year}</div>\n                <div class=\"shots-preview__title\">{title}</div>\n            </div>\n        </div>\n    ");
      Lampa.Template.add('shots_tags', "\n        <div class=\"shots-tags\"></div>\n    ");
      Lampa.Template.add('shots_upload_complete_text', "\n        <div class=\"about\">\n            <div style=\"padding-bottom: 1em;\">\n                #{shots_upload_complete_text}\n            </div>\n        </div>\n    ");
      Lampa.Template.add('shots_upload_notice_text', "\n        <div class=\"about\">\n            <div style=\"padding-bottom: 1em;\">\n                #{shots_upload_notice_text}\n            </div>\n        </div>\n    ");
      Lampa.Template.add('shots_lenta', "\n        <div class=\"shots-lenta\">\n            <div class=\"shots-lenta__video\"></div>\n            <div class=\"shots-lenta__panel\"></div>\n        </div>\n    ");
      Lampa.Template.add('shots_lenta_video', "\n        <div class=\"shots-lenta-video\">\n            <video class=\"shots-lenta-video__video-element\" autoplay loop poster=\"./img/video_poster.png\"></video>\n            <div class=\"shots-lenta-video__progress-bar\">\n                <div></div>\n            </div>\n            <div class=\"player-video__loader shots-lenta-video__loader\"></div>\n            <div class=\"shots-lenta-video__layer\"></div>\n        </div>\n    ");
      Lampa.Template.add('shots_lenta_panel', "\n        <div class=\"shots-lenta-panel\">\n            <div class=\"explorer-card__head shots-lenta-panel__card loading\">\n                <div class=\"explorer-card__head-left\">\n                    <div class=\"explorer-card__head-img selector shots-lenta-panel__card-img\">\n                        <img>\n                    </div>\n                </div>\n                <div class=\"explorer-card__head-body selector\">\n                    <div class=\"shots-lenta-panel__info\">\n                        <div class=\"explorer-card__head-create shots-lenta-panel__card-year\"></div>\n                        <div class=\"shots-lenta-panel__card-title\"></div>\n                        <div class=\"shots-lenta-panel__recorder hide\"></div>\n                        <div class=\"shots-lenta-panel__tags\"></div>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"shots-lenta-panel__right\">\n                <div class=\"shots-lenta-panel__author\"></div>\n\n                <div class=\"shots-lenta-panel__buttons\">\n                    <div class=\"selector action-liked\">\n                        <svg width=\"39\" height=\"35\" viewBox=\"0 0 39 35\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M26.6504 1.50977C29.2617 1.38597 32.2036 2.36705 34.7168 5.42676C37.1567 8.39737 37.1576 11.3625 36.2148 14.002C35.2408 16.7288 33.2538 19.0705 31.834 20.4238C31.8295 20.4281 31.8247 20.4322 31.8203 20.4365L19.1484 32.8271L6.47754 20.4365C5.03099 18.9847 3.053 16.646 2.08203 13.9443C1.14183 11.3282 1.13938 8.39959 3.58105 5.42676C6.09429 2.36705 9.03613 1.38597 11.6475 1.50977C14.3299 1.63693 16.7044 2.92997 17.9932 4.4873C18.2781 4.83167 18.7024 5.03125 19.1494 5.03125C19.5962 5.03113 20.0198 4.83157 20.3047 4.4873C21.5934 2.92997 23.968 1.63697 26.6504 1.50977Z\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\" fill=\"currentColor\" class=\"icon-fill\"/>\n                        </svg>\n                    </div>\n                    <div class=\"selector action-favorite\">\n                        <svg width=\"21\" height=\"32\" viewBox=\"0 0 21 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M2 1.5H19C19.2761 1.5 19.5 1.72386 19.5 2V27.9618C19.5 28.3756 19.0261 28.6103 18.697 28.3595L12.6212 23.7303C11.3682 22.7757 9.63183 22.7757 8.37885 23.7303L2.30302 28.3595C1.9739 28.6103 1.5 28.3756 1.5 27.9618V2C1.5 1.72386 1.72386 1.5 2 1.5Z\" stroke=\"currentColor\" stroke-width=\"2.5\" fill=\"currentColor\" class=\"icon-fill\"></path>\n                        </svg>\n                    </div>\n                    <div class=\"selector action-more\">\n                        <svg><use xlink:href=\"#sprite-dots\"></use></svg>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ");
      Lampa.Template.add('shots_counter', "\n        <div class=\"shots-counter\">\n            <span></span>\n            <div></div>\n        </div>\n    ");
      Lampa.Template.add('shots_author', "\n        <div class=\"shots-author\">\n            <div class=\"shots-author__img\">\n                <img>\n            </div>\n            <div class=\"shots-author__name\"></div>\n        </div>\n    ");
      var sprites = "\n        <symbol id=\"sprite-love\" viewBox=\"0 0 39 35\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M26.6504 1.50977C29.2617 1.38597 32.2036 2.36705 34.7168 5.42676C37.1567 8.39737 37.1576 11.3625 36.2148 14.002C35.2408 16.7288 33.2538 19.0705 31.834 20.4238C31.8295 20.4281 31.8247 20.4322 31.8203 20.4365L19.1484 32.8271L6.47754 20.4365C5.03099 18.9847 3.053 16.646 2.08203 13.9443C1.14183 11.3282 1.13938 8.39959 3.58105 5.42676C6.09429 2.36705 9.03613 1.38597 11.6475 1.50977C14.3299 1.63693 16.7044 2.92997 17.9932 4.4873C18.2781 4.83167 18.7024 5.03125 19.1494 5.03125C19.5962 5.03113 20.0198 4.83157 20.3047 4.4873C21.5934 2.92997 23.968 1.63697 26.6504 1.50977Z\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\"/>\n        </symbol>\n\n        <symbol id=\"sprite-shots\" viewBox=\"0 0 512 512\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M253.266 512a19.166 19.166 0 0 1-19.168-19.168V330.607l-135.071-.049a19.164 19.164 0 0 1-16.832-28.32L241.06 10.013a19.167 19.167 0 0 1 36.005 9.154v162.534h135.902a19.167 19.167 0 0 1 16.815 28.363L270.078 502.03a19.173 19.173 0 0 1-16.812 9.97z\" fill=\"currentColor\"></path>\n        </symbol>\n\n        <symbol id=\"sprite-shots-notitles\" viewBox=\"0 0 474 138\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect x=\"1.5\" y=\"1.5\" width=\"216.196\" height=\"121.309\" rx=\"9.5\" stroke=\"white\" stroke-width=\"3\"/>\n            <rect x=\"255.49\" y=\"1.5\" width=\"216.196\" height=\"121.309\" rx=\"9.5\" stroke=\"white\" stroke-width=\"3\"/>\n            <rect x=\"77.9692\" y=\"49.6289\" width=\"63.2581\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"51.4348\" y=\"64.8156\" width=\"116.327\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"302.813\" y=\"27.8919\" width=\"58.0774\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"345.485\" y=\"10.1938\" width=\"36.2068\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"319.336\" y=\"44.1069\" width=\"41.5542\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"312.751\" y=\"60.3219\" width=\"48.1394\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.66\" x=\"316.25\" y=\"76.5368\" width=\"44.6411\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.38\" x=\"342.385\" y=\"92.7517\" width=\"18.5054\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.28\" x=\"308.429\" y=\"108.967\" width=\"52.4612\" height=\"4.04266\" rx=\"2.02133\" fill=\"white\"/>\n            <rect x=\"371.113\" y=\"27.8919\" width=\"38.2129\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"371.113\" y=\"44.1069\" width=\"47.8267\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"371.113\" y=\"60.3219\" width=\"29.3054\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.66\" x=\"371.113\" y=\"76.5368\" width=\"44.3281\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.38\" x=\"371.113\" y=\"92.7517\" width=\"29.3054\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.28\" x=\"371.113\" y=\"108.967\" width=\"30.9517\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"99.001\" y=\"80.0025\" width=\"21.1946\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"169.168\" y=\"88.6869\" width=\"62.5064\" height=\"6.28762\" rx=\"3.14381\" transform=\"rotate(45 169.168 88.6869)\" fill=\"#FF3F3F\"/>\n            <rect width=\"62.5064\" height=\"6.28762\" rx=\"3.14381\" transform=\"matrix(-0.707107 0.707107 0.707107 0.707107 208.921 88.6869)\" fill=\"#FF3F3F\"/>\n            <rect x=\"423.386\" y=\"88.6869\" width=\"62.5064\" height=\"6.28762\" rx=\"3.14381\" transform=\"rotate(45 423.386 88.6869)\" fill=\"#FF3F3F\"/>\n            <rect width=\"62.5064\" height=\"6.28762\" rx=\"3.14381\" transform=\"matrix(-0.707107 0.707107 0.707107 0.707107 463.138 88.6869)\" fill=\"#FF3F3F\"/>\n        </symbol>\n\n        <symbol id=\"sprite-shots-howneed\" viewBox=\"0 0 474 138\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect x=\"1.5\" y=\"1.5\" width=\"216.196\" height=\"121.309\" rx=\"9.5\" stroke=\"white\" stroke-width=\"3\"/>\n            <rect x=\"255.49\" y=\"1.5\" width=\"216.196\" height=\"121.309\" rx=\"9.5\" stroke=\"white\" stroke-width=\"3\"/>\n            <rect x=\"54.1262\" y=\"103.818\" width=\"47.7241\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.28\" x=\"16.4497\" y=\"103.818\" width=\"186.409\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"302.813\" y=\"27.8919\" width=\"58.0774\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"345.485\" y=\"10.1938\" width=\"36.2068\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"319.336\" y=\"44.1069\" width=\"41.5542\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"312.751\" y=\"60.3219\" width=\"48.1394\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.66\" x=\"316.25\" y=\"76.5368\" width=\"44.6411\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.38\" x=\"342.385\" y=\"92.7517\" width=\"18.5054\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.28\" x=\"308.429\" y=\"108.967\" width=\"52.4612\" height=\"4.04266\" rx=\"2.02133\" fill=\"white\"/>\n            <rect x=\"371.113\" y=\"27.8919\" width=\"38.2129\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"371.113\" y=\"44.1069\" width=\"47.8267\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"371.113\" y=\"60.3219\" width=\"29.3054\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.66\" x=\"371.113\" y=\"76.5368\" width=\"44.3281\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.28\" x=\"371.113\" y=\"108.967\" width=\"30.9517\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"59.2751\" y=\"100.74\" width=\"11.3044\" height=\"5.14891\" rx=\"2.57446\" transform=\"rotate(90 59.2751 100.74)\" fill=\"white\"/>\n            <rect x=\"101.85\" y=\"100.74\" width=\"11.3044\" height=\"5.14891\" rx=\"2.57446\" transform=\"rotate(90 101.85 100.74)\" fill=\"white\"/>\n            <rect x=\"423.386\" y=\"88.6869\" width=\"62.5064\" height=\"6.28762\" rx=\"3.14381\" transform=\"rotate(45 423.386 88.6869)\" fill=\"#FF3F3F\"/>\n            <rect width=\"62.5064\" height=\"6.28762\" rx=\"3.14381\" transform=\"matrix(-0.707107 0.707107 0.707107 0.707107 463.138 88.6869)\" fill=\"#FF3F3F\"/>\n        </symbol>\n    ";
      document.querySelector('#sprites').innerHTML += sprites;
    }
    var Templates = {
      init: init$6
    };

    function videoScreenShot(video) {
      var screen_width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 320;
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var scale = screen_width / video.videoWidth;
      var width = Math.round(video.videoWidth * scale);
      var height = Math.round(video.videoHeight * scale);
      canvas.width = width;
      canvas.height = height;
      try {
        context.drawImage(video, 0, 0, width, height);
      } catch (e) {
        console.error('Shots', 'video screenshot error:', e.message);
      }
      return canvas.toDataURL('image/png');
    }
    function videoReplaceStatus(from, to) {
      to.status = from.status;
      to.screen = from.screen;
      to.file = from.file;
    }
    function getBalanser(card) {
      var history_data = Lampa.Storage.get('online_watched_last', '{}');
      var history_key = Lampa.Utils.hash(card.name ? card.original_name : card.original_title);
      var history_item = history_data[history_key];
      return history_item && history_item.balanser ? history_item.balanser : '';
    }
    function shortVoice(voice) {
      return (voice || '').replace(/\s[^a-zA-Zа-яА-Я0-9].*$/, '').trim();
    }
    function isTSQuality(str) {
      return str.toLowerCase().indexOf(' ts') > -1 || str.toLowerCase().indexOf(' ad') > -1;
    }
    function modal(html, buttons, back) {
      var body = $('<div></div>');
      var footer = $('<div class="shots-modal-footer"></div>');
      body.append(html);
      body.append(footer);
      buttons.forEach(function (button) {
        var btn = Lampa.Template.get('shots_button', {
          text: button.name
        });
        btn.on('hover:enter', function () {
          if (button.onSelect) button.onSelect();
        });
        if (button.cancel) btn.addClass('shots-selector--transparent');
        footer.append(btn);
      });
      Lampa.Modal.open({
        html: body,
        size: 'small',
        scroll: {
          nopadding: true
        },
        onBack: back
      });
    }
    var Utils = {
      videoScreenShot: videoScreenShot,
      videoReplaceStatus: videoReplaceStatus,
      getBalanser: getBalanser,
      shortVoice: shortVoice,
      isTSQuality: isTSQuality,
      modal: modal
    };

    var Defined = {
      quota_next_record: 1000 * 60 * 10,
      // 10 минут
      video_size: 1280,
      screen_size: 500,
      recorder_max_duration: 60 * 5,
      // 5 минут
      cdn: 'https://cdn.cub.rip/shots/'
    };

    function counter(method, v1, v2, v3) {
      $.ajax({
        dataType: 'json',
        url: Lampa.Utils.protocol() + Lampa.Manifest.cub_domain + '/api/metric/stat?method=' + method + '&value_one=' + (v1 || '') + '&value_two=' + (v2 || '') + '&value_three=' + (v3 || '')
      });
    }
    var Metric = {
      counter: counter
    };

    function Recorder(video) {
      this.html = Lampa.Template.get('shots_player_recorder');
      var start_point = video.currentTime;
      this.start = function () {
        Metric.counter('shots_recorder_start');
        try {
          this.screenshot = Utils.videoScreenShot(video, Defined.screen_size);
          this.run();
        } catch (e) {
          console.error('Recorder', e.message);
          this.error(e);
        }
      };
      this.run = function () {
        var _this = this;
        $('body').append(this.html);
        var button_stop = this.html.find('.shots-player-recorder__stop');
        var button_forward = this.html.find('.shots-player-recorder__forward');
        var button_rewind = this.html.find('.shots-player-recorder__rewind');
        button_stop.on('hover:enter', this.stop.bind(this));
        button_forward.on('hover:enter', function () {
          if (video.currentTime < start_point + Defined.recorder_max_duration) {
            video.currentTime += 5;
            _this.tik();
          }
        });
        button_rewind.on('hover:enter', function () {
          if (video.currentTime - 10 > start_point) {
            video.currentTime -= 5;
            _this.tik();
          }
        });
        Lampa.Controller.add('recorder', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(_this.html);
            Lampa.Controller.collectionFocus(button_stop, _this.html);
          },
          left: function left() {
            Navigator.move('left');
          },
          right: function right() {
            Navigator.move('right');
          },
          back: this.stop.bind(this)
        });
        Lampa.Controller.toggle('recorder');
        this.interval = setInterval(this.tik.bind(this), 1000);
        this.tik();
        this.onRun();
      };
      this.tik = function () {
        var seconds = Math.round(video.currentTime - start_point);
        var progress = Lampa.Utils.secondsToTime(seconds).split(':');
        progress = progress[1] + ':' + progress[2];
        this.html.find('.shots-player-recorder__text span').text(progress + ' / ' + Lampa.Utils.secondsToTimeHuman(Defined.recorder_max_duration));
        if (seconds >= Defined.recorder_max_duration) this.stop();
      };
      this.error = function (e) {
        this.destroy();
        this.onError(e);
        Metric.counter('shots_recorder_error');
      };
      this.stop = function () {
        var elapsed = video.currentTime - start_point;
        if (elapsed < 1) {
          this.error(new Error('Stoped too early, maybe codecs not supported'));
        } else {
          this.destroy();
          this.onStop({
            duration: Math.round(elapsed),
            screenshot: this.screenshot,
            start_point: Math.round(start_point),
            end_point: Math.round(video.currentTime)
          });
          Metric.counter('shots_recorder_end');
        }
      };
      this.destroy = function () {
        clearInterval(this.interval);
        this.html.remove();
      };
    }

    function Tags$1() {
      var tags_data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.html = Lampa.Template.get('shots_tags');
      this.create = function () {
        if (tags_data) this.update(tags_data);
      };
      this.update = function (data) {
        var tags = [];
        this.html.empty();
        data.season && tags.push('S-' + data.season);
        data.episode && tags.push('E-' + data.episode);
        var voice = Utils.shortVoice(data.voice_name);
        if (data.voice_name && voice !== data.card_title) tags.push(voice);
        this.html.append(tags.map(function (tag) {
          return '<div>' + tag + '</div>';
        }).join(''));
      };
      this.render = function () {
        return this.html;
      };
      this.destroy = function () {
        this.html.remove();
      };
    }

    function Preview(data) {
      this.data = data;
      this.html = Lampa.Template.get('shots_preview');
      this.create = function () {
        if (this.data.recording.screenshot) {
          this.html.find('.shots-preview__screenshot img').css({
            opacity: 1
          }).eq(0)[0].src = this.data.recording.screenshot;
        }
        var release_date = this.data.play_data.card.release_date || this.data.play_data.card.first_air_date || '';
        var year = release_date.slice(0, 4);
        this.html.find('.shots-preview__year').html(year || '----');
        this.html.find('.shots-preview__title').html(this.data.play_data.card.name || this.data.play_data.card.title || '');
        this.tags = new Tags$1(this.data.play_data);
        this.tags.create();
        this.html.find('.shots-preview__body').append(this.tags.render());
      };
      this.render = function () {
        return this.html;
      };
      this.destroy = function () {
        this.html.remove();
      };
    }

    function Checkbox() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.html = Lampa.Template.get('shots_checkbox');
      this.state = params.state || false;
      this.create = function () {
        var _this = this;
        this.setText(params.text || '');
        this.setState(this.state);
        this.html.on('hover:enter', function () {
          _this.setState(!_this.state);
        });
      };
      this.setText = function (text) {
        this.html.find('.shots-checkbox__text').html(text);
      };
      this.setState = function (state) {
        this.state = state;
        this.html.toggleClass('shots-checkbox--checked', state);
      };
      this.render = function () {
        return this.html;
      };
      this.destroy = function () {
        this.html.remove();
      };
    }

    function url(u) {
      //return 'http://localhost:3100/api/shots/' + u
      return Lampa.Utils.protocol() + Lampa.Manifest.cub_domain + '/api/shots/' + u;
    }
    function params() {
      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 15000;
      if (!Lampa.Account.Permit.account.token) return {
        timeout: timeout
      };
      return {
        headers: {
          token: Lampa.Account.Permit.account.token,
          profile: Lampa.Account.Permit.account.profile.id
        },
        timeout: timeout
      };
    }
    function uploadRequest(data, onsuccess, onerror) {
      Lampa.Network.silent(url('upload-request'), onsuccess, onerror, data, params());
    }
    function uploadStatus(id, onsuccess, onerror) {
      Lampa.Network.silent(url('upload-status/' + id), onsuccess, onerror, null, params(5000));
    }
    function shotsVideo(id, onsuccess, onerror) {
      Lampa.Network.silent(url('video/' + id), onsuccess, onerror, null, params(5000));
    }
    function shotsList(type) {
      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var onsuccess = arguments.length > 2 ? arguments[2] : undefined;
      var onerror = arguments.length > 3 ? arguments[3] : undefined;
      Lampa.Network.silent(url('list/' + type + '?page=' + page), onsuccess, onerror, null, params(5000));
    }
    function shotsCard(card) {
      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var onsuccess = arguments.length > 2 ? arguments[2] : undefined;
      var onerror = arguments.length > 3 ? arguments[3] : undefined;
      Lampa.Network.silent(url('card/' + card.id + '/' + (card.original_name ? 'tv' : 'movie') + '?page=' + page), onsuccess, onerror, null, params(5000));
    }
    function shotsChannel(id) {
      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var onsuccess = arguments.length > 2 ? arguments[2] : undefined;
      var onerror = arguments.length > 3 ? arguments[3] : undefined;
      Lampa.Network.silent(url('channel/' + id + '?page=' + page), onsuccess, onerror, null, params(10000));
    }
    function shotsLiked(id, type, onsuccess, onerror) {
      var uid = Lampa.Storage.get('lampa_uid', '');
      Lampa.Network.silent(url('liked?uid=' + uid), onsuccess, onerror, {
        id: id,
        type: type
      }, params(5000));
    }
    function shotsBlock(id, onsuccess, onerror) {
      Lampa.Network.silent(url('block'), onsuccess, onerror, {
        id: id
      }, params());
    }
    function shotsReport$1(id, onsuccess, onerror) {
      Lampa.Network.silent(url('report'), onsuccess, onerror, {
        id: id
      }, params());
    }
    function shotsDelete$1(id, onsuccess, onerror) {
      Lampa.Network.silent(url('delete'), onsuccess, onerror, {
        id: id
      }, params());
    }
    function shotsFavorite(action, shot, onsuccess, onerror) {
      Lampa.Network.silent(url('favorite'), onsuccess, onerror, {
        sid: shot.id,
        card_title: shot.card_title,
        card_poster: shot.card_poster,
        action: action
      }, params(5000));
    }
    function lenta() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var onsuccess = arguments.length > 1 ? arguments[1] : undefined;
      var uid = Lampa.Storage.get('lampa_uid', '');
      Lampa.Arrays.extend(query, {
        page: 1,
        sort: 'id',
        uid: uid,
        limit: 20
      });
      var path = [];
      for (var key in query) {
        path.push(key + '=' + encodeURIComponent(query[key]));
      }
      Lampa.Network.silent(url('lenta?' + path.join('&')), function (result) {
        onsuccess(result.results);
      }, function () {
        onsuccess([]);
      }, null, params(10000));
    }
    function shotsViewed(id, onsuccess, onerror) {
      var uid = Lampa.Storage.get('lampa_uid', '');
      Lampa.Network.silent(url('viewed?uid=' + uid), onsuccess, onerror, {
        id: id
      }, params(5000));
    }
    var Api = {
      uploadRequest: uploadRequest,
      uploadStatus: uploadStatus,
      shotsList: shotsList,
      shotsLiked: shotsLiked,
      shotsFavorite: shotsFavorite,
      shotsVideo: shotsVideo,
      shotsBlock: shotsBlock,
      shotsReport: shotsReport$1,
      shotsDelete: shotsDelete$1,
      shotsCard: shotsCard,
      shotsChannel: shotsChannel,
      shotsViewed: shotsViewed,
      lenta: lenta
    };

    function Progress() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.html = Lampa.Template.get('shots_progress');
      this.text = params.text || '';
      this.create = function () {
        this.setText(this.text);
        this.setProgress(0);
        this.setState('waiting');
      };
      this.setText = function (text) {
        this.text = text;
        this.html.find('.shots-progress__text').text(this.text);
      };
      this.setProgress = function (percent) {
        this.html.find('.shots-progress__bar div').css('width', percent + '%');
      };
      this.setState = function (state) {
        this.html.removeClass('state--waiting state--uploading state--done');
        this.html.addClass('state--' + state);
      };
      this.render = function () {
        return this.html;
      };
      this.destroy = function () {
        this.html.remove();
      };
    }

    function _defineProperty(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[r] = t, e;
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function (r) {
          return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread2(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
          _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
      }
      return e;
    }
    function _toPrimitive(t, r) {
      if ("object" != typeof t || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == typeof i ? i : i + "";
    }

    var shots$1 = {};
    function init$5() {
      Lampa.Timer.add(1000 * 60, function () {
        for (var i in shots$1) {
          check(shots$1[i]);
        }
      });
    }
    function check(shot) {
      if (shot.status == 'ready' || shot.status == 'error') return stop(shot);
      Api.uploadStatus(shot.id, function (json) {
        if (json.status == 'ready') {
          Lampa.Bell.push({
            icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
            text: Lampa.Lang.translate('shots_upload_complete_notify')
          });
        }
        if (json.status == 'error') {
          Lampa.Bell.push({
            icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
            text: Lampa.Lang.translate('shots_upload_error_notify')
          });
        }
        if (json.status == 'ready' || json.status == 'error') stop(shot);
        Lampa.Listener.send('shots_status', _objectSpread2({}, json));
      });
    }
    function add$3(shot) {
      if (!shots$1[shot.id]) shots$1[shot.id] = shot;
    }
    function stop(shot) {
      delete shots$1[shot.id];
    }
    var Handler = {
      init: init$5,
      add: add$3,
      stop: stop
    };

    var created = [];
    function init$4() {
      created = Lampa.Storage.get('shots_created', '[]');
      update$1();
      Lampa.Listener.follow('shots_status', updateStatus$1);
      Lampa.Listener.follow('shots_update', updateData$1);
      Lampa.Listener.follow('state:changed', function (e) {
        if (e.target == 'favorite' && (e.reason == 'profile' || e.reason == 'read')) {
          created = [];
          update$1();
        }
      });
      Lampa.Socket.listener.follow('message', function (result) {
        if (result.method == 'update' && result.data.from == 'shots' && result.data.list == 'created') {
          update$1();
        }
      });
    }
    function updateStatus$1(shot) {
      var find = created.find(function (a) {
        return a.id == shot.id;
      });
      if (find) {
        find.status = shot.status;
        find.screen = shot.screen;
        find.file = shot.file;
        Lampa.Storage.set('shots_created', created);
      }
    }
    function updateData$1(shot) {
      var find = created.find(function (a) {
        return a.id == shot.id;
      });
      if (find) {
        find.liked = shot.liked;
        find.saved = shot.saved;
        Lampa.Storage.set('shots_created', created);
      }
    }
    function update$1() {
      Api.shotsList('created', 1, function (shots) {
        created = shots.results;
        Lampa.Storage.set('shots_created', created);
      });
    }
    function add$2(shot) {
      var clone = {};
      Object.assign(clone, shot);
      delete clone.params;
      Lampa.Arrays.insert(created, 0, clone);
      if (created.length > 20) {
        created = created.slice(0, 20);
      }
      Lampa.Storage.set('shots_created', created);
      Lampa.Socket.send('update', {
        params: {
          from: 'shots',
          list: 'created'
        }
      });
    }
    function remove$3(shot) {
      var find_in = created.find(function (a) {
        return a.id == shot.id;
      });
      if (find_in) Lampa.Arrays.remove(created, find_in);
      Lampa.Storage.set('shots_created', created);
      Lampa.Listener.send('shots_status', {
        id: shot.id,
        status: 'deleted',
        file: shot.file,
        screen: shot.screen
      });
      Lampa.Socket.send('update', {
        params: {
          from: 'shots',
          list: 'created'
        }
      });
    }
    function page$1(page, callback) {
      Api.shotsList('created', page, function (shots) {
        callback(shots.results);
      }, function () {
        callback([]);
      });
    }
    function get$2() {
      return Lampa.Arrays.clone(created);
    }
    function find$2(id) {
      return Boolean(created.find(function (a) {
        return a.id == id;
      }));
    }
    var Created = {
      init: init$4,
      remove: remove$3,
      add: add$2,
      get: get$2,
      find: find$2,
      page: page$1
    };

    function Selector(list) {
      this.html = $('<div class="shots-selector-tags"></div>');
      this.list = list || [];
      this.selected = [];
      this.create = function () {
        var _this = this;
        this.list.forEach(function (t) {
          var tag = $('<div class="shots-selector-tags__tag selector"><span>' + t.title + '</span></div>');
          tag.on('hover:enter', function (e) {
            tag.toggleClass('active');
            if (_this.selected.indexOf(t) == -1) {
              _this.selected.push(t);
            } else {
              Lampa.Arrays.remove(_this.selected, t);
            }
          });
          _this.html.append(tag);
        });
      };
      this.get = function () {
        return this.selected;
      };
      this.render = function () {
        return this.html;
      };
      this.destroy = function () {
        this.html.remove();
      };
    }

    var tags = [{
      id: 1,
      slug: 'action'
    }, {
      id: 2,
      slug: 'comedy'
    }, {
      id: 3,
      slug: 'drama'
    }, {
      id: 4,
      slug: 'fantasy'
    }, {
      id: 5,
      slug: 'horror'
    }, {
      id: 6,
      slug: 'thriller'
    }, {
      id: 7,
      slug: 'anime'
    }, {
      id: 8,
      slug: 'sci_fi'
    }];
    function load$1() {
      tags = translate(tags);
    }
    function translate(list) {
      return list.map(function (t) {
        t.title = Lampa.Lang.translate('shots_tag_' + t.slug);
        return t;
      });
    }
    function list() {
      return tags;
    }
    var Tags = {
      load: load$1,
      list: list,
      translate: translate
    };

    function Upload(data) {
      this.data = data;
      this.html = Lampa.Template.get('shots_modal_upload');
      this.start = function () {
        var _this = this;
        this.preview = new Preview(this.data);
        this.checkbox = new Checkbox({
          text: Lampa.Lang.translate('Сделать публичной'),
          state: true
        });
        this.progress = new Progress({
          text: Lampa.Lang.translate('shots_upload_progress_start')
        });
        this.selector_title = $('<div class="shots-line-title">' + Lampa.Lang.translate('shots_choice_tags') + '</div>');
        this.selector = new Selector(Tags.list());
        this.checkbox.create();
        this.preview.create();
        this.progress.create();
        this.progress.render().addClass('hide');
        this.selector.create();
        this.button_upload = Lampa.Template.get('shots_button', {
          text: Lampa.Lang.translate('shots_modal_button_upload_start')
        });
        this.button_cancel = Lampa.Template.get('shots_button', {
          text: Lampa.Lang.translate('shots_modal_button_upload_cancel')
        });
        this.button_again = Lampa.Template.get('shots_button', {
          text: Lampa.Lang.translate('shots_modal_button_upload_again')
        });
        this.button_complete = Lampa.Template.get('shots_button', {
          text: Lampa.Lang.translate('shots_modal_button_upload_complete')
        });
        this.text_complete = Lampa.Template.get('shots_upload_complete_text');
        this.text_notice = Lampa.Template.get('shots_upload_notice_text');
        this.button_again.addClass('hide').on('hover:enter', this.startUpload.bind(this));
        this.button_upload.on('hover:enter', this.startUpload.bind(this));
        this.button_complete.addClass('hide').on('hover:enter', function () {
          _this.destroy();
          _this.onComplete(_this.shot_ready);
        });
        this.text_complete.addClass('hide');
        this.button_cancel.addClass('shots-selector--transparent');
        this.button_cancel.on('hover:enter', this.cancelUpload.bind(this));
        this.html.find('.shots-modal-upload__preview').append(this.preview.render());
        this.html.find('.shots-modal-upload__body').append(this.text_notice).append(this.selector_title).append(this.selector.render()).append(this.button_upload).append(this.progress.render()).append(this.button_again).append(this.button_cancel).append(this.text_complete).append(this.button_complete);
        Lampa.Modal.open({
          html: this.html,
          size: 'small',
          scroll: {
            nopadding: true
          },
          onBack: function onBack() {}
        });
      };
      this.setFocus = function (target) {
        Lampa.Controller.clear();
        Lampa.Controller.collectionSet(this.html);
        Lampa.Controller.collectionFocus(target, this.html);
      };
      this.startUpload = function () {
        this.button_again.addClass('hide');
        this.button_upload.addClass('hide');
        this.progress.render().removeClass('hide');
        this.setFocus(this.progress.render());
        this.progress.setText(Lampa.Lang.translate('shots_upload_progress_start'));
        this.progress.setState('waiting');
        var play = this.data.play_data;
        var card = play.card;
        Api.uploadRequest({
          card_id: card.id,
          card_type: card.original_name ? 'tv' : 'movie',
          card_title: card.title || card.name || card.original_title || card.original_name || 'Unknown',
          card_year: (card.release_date || card.first_air_date || '----').slice(0, 4),
          card_poster: card.poster_path || '',
          start_point: this.data.recording.start_point,
          end_point: this.data.recording.end_point,
          season: play.season || 0,
          episode: play.episode || 0,
          voice_name: play.voice_name || '',
          balanser: play.balanser || '',
          tags: this.selector.get().map(function (t) {
            return t.id;
          }),
          recorder: 'new'
        }, this.endUpload.bind(this), this.errorUpload.bind(this));
      };
      this.errorUpload = function (e) {
        this.progress.render().addClass('hide');
        this.button_again.removeClass('hide');
        this.setFocus(this.button_again);
      };
      this.endUpload = function (upload) {
        this.progress.render().addClass('hide');
        this.button_cancel.addClass('hide');
        this.button_complete.removeClass('hide');
        this.text_complete.removeClass('hide');
        this.text_notice.addClass('hide');
        this.selector_title.remove();
        this.selector.destroy();
        Lampa.Storage.set('shots_last_record', Date.now());
        Api.shotsVideo(upload.id, function (result) {
          Created.add(result.video);
          Handler.add(result.video);
        });
        this.setFocus(this.button_complete);
      };
      this.cancelUpload = function () {
        if (this.uploading) this.uploading.abort();
        this.destroy();
        this.onCancel();
      };
      this.destroy = function () {
        Lampa.Modal.close();
        this.preview.destroy();
        this.checkbox.destroy();
        this.html.remove();
        this.runUpload = function () {};
        this.endUpload = function () {};
        this.cancelUpload = function () {};
        this.notifyUpload = function () {};
      };
    }

    var loaded_shots = {};
    function init$3() {
      var button = "<div class=\"full-start__button shots-view-button selector view--online\" data-subtitle=\"#{shots_watch}\">\n        <svg><use xlink:href=\"#sprite-shots\"></use></svg>\n\n        <span class=\"shots-view-button__title\">Shots</span>\n    </div>";
      Lampa.Listener.follow('full', function (e) {
        if (e.type == 'complite' && (Lampa.Storage.field('shots_in_card') || Lampa.Storage.field('shots_in_player'))) {
          var btn = $(Lampa.Lang.translate(button));
          var mov = e.data.movie;
          btn.on('hover:enter', function () {
            Lampa.Activity.push({
              url: '',
              title: 'Shots',
              component: 'shots_card',
              card: mov,
              page: 1
            });
          });
          load(mov, function (shots) {
            if (shots.length) {
              console.log('Shots', 'load for full view:', shots.length, 'items;', 'card id:', mov.id, mov.original_name ? 'tv' : 'movie');
              btn.attr('data-subtitle', Lampa.Lang.translate('shots_watch') + ' <span class="shots-view-button__count">' + (shots.length > 99 ? '99+' : shots.length) + '</span>');
            }
          });
          if (Lampa.Storage.field('shots_in_card')) e.object.activity.render().find('.view--torrent').last().after(btn);
        }
      });
    }
    function load(card, call) {
      var key = card.id + '_' + (card.original_name ? 'tv' : 'movie');
      if (loaded_shots[key]) {
        call(loaded_shots[key]);
      } else {
        Api.shotsCard(card, 1, function (data) {
          loaded_shots[key] = data.results;
          call(data.results);
        });
      }
    }
    function clear() {
      loaded_shots = {};
    }
    function remove$2(card) {
      var key = card.id + '_' + (card.original_name ? 'tv' : 'movie');
      delete loaded_shots[key];
    }
    function get$1(card) {
      var key = card.id + '_' + (card.original_name ? 'tv' : 'movie');
      return loaded_shots[key];
    }
    var View = {
      init: init$3,
      load: load,
      clear: clear,
      remove: remove$2,
      get: get$1
    };

    var button_record = null;
    var play_data = {};
    var player_shots = null;
    function init$2() {
      Lampa.Player.listener.follow('ready', startPlayer);
      Lampa.Player.listener.follow('destroy', stopPlayer);
      button_record = Lampa.Template.get('shots_player_record_button');
      button_record.on('hover:enter', beforeRecording);
      button_record.addClass('hide');
      Lampa.PlayerPanel.render().find('.player-panel__settings').after(button_record);
      Lampa.Controller.listener.follow('toggle', function (e) {
        if (player_shots) player_shots.toggleClass('focus', e.name == 'player_rewind' || Lampa.Platform.mouse() || Lampa.Utils.isTouchDevice());
      });
    }
    function playerPanel(status) {
      Lampa.Player.render().toggleClass('shots-player--recording', !status);
    }
    function startPlayer(data) {
      var _play_data$card;
      play_data = {};
      if (data.card) play_data.card = data.card;else if (Lampa.Activity.active().movie) {
        play_data.card = Lampa.Activity.active().movie;
      }
      var possibly = true;
      var type = (_play_data$card = play_data.card) !== null && _play_data$card !== void 0 && _play_data$card.original_name ? 'tv' : 'movie';
      if (data.iptv || data.youtube) possibly = false;else if (!Lampa.Account.Permit.token) possibly = false;else if (type == 'tv' && (!data.season || !data.episode)) possibly = false;
      if (possibly) {
        play_data.season = data.season || 0;
        play_data.episode = data.episode || 0;
        play_data.voice_name = (data.voice_name || '').trim();
        setTimeout(function () {
          play_data.balanser = Utils.getBalanser(play_data.card || {});
        }, 1000);
        if (play_data.card) {
          var year = parseInt((play_data.card.release_date || play_data.card.first_air_date || '----').slice(0, 4));
          if (type == 'movie') {
            var player_title = Lampa.Player.playdata().title || '';
            play_data.voice_name = (play_data.voice_name || player_title || '').trim();
            if (play_data.voice_name == play_data.card.title || play_data.torrent_hash) play_data.voice_name = '';
          }
          if (!(Utils.isTSQuality(play_data.voice_name) || Utils.isTSQuality(Lampa.Player.playdata().title)) && year >= 1985) button_record.removeClass('hide');
        }
      }
      if (play_data.card && (play_data.card.source == 'tmdb' || play_data.card.source == 'cub')) {
        if (Lampa.Storage.field('shots_in_player')) playerShotsSegments();
      }
    }
    function stopPlayer() {
      button_record.addClass('hide');
      if (player_shots) {
        player_shots.remove();
        player_shots = null;
      }
      playerPanel(true);
      if (play_data.need_tocontent) {
        setTimeout(function () {
          Lampa.Controller.toggle('content');
        }, 100);
      }
    }
    function playerShotsSegments() {
      var type = play_data.card.original_name ? 'tv' : 'movie';
      var video = Lampa.PlayerVideo.video();
      if (type == 'tv' && (!play_data.season || !play_data.episode)) return;
      video.addEventListener('loadeddata', function () {
        View.load(play_data.card, function (shots) {
          if (!Lampa.Player.opened()) return;
          if (type == 'tv' && play_data.season && play_data.episode) {
            shots = shots.filter(function (e) {
              return e.season == play_data.season && e.episode == play_data.episode;
            });
          }
          if (shots.length) {
            player_shots = $('<div class="shots-player-segments"></div>');
            player_shots.toggleClass('focus', Lampa.Platform.mouse() || Lampa.Utils.isTouchDevice());
            shots = shots.filter(function (s) {
              // сортируем по start_point один раз и используем временные поля на массиве
              if (!shots._sorted) {
                shots.sort(function (a, b) {
                  return (Number(a.start_point) || 0) - (Number(b.start_point) || 0);
                });
                shots._sorted = true;
                shots._last_end = -Infinity;
              }
              var start = Number(s.start_point || 0);
              var end = Number(s.end_point || start);

              // если перекрывается с предыдущим включённым — исключаем
              if (start < shots._last_end) return false;

              // обновляем край текущего включённого сегмента
              shots._last_end = Math.max(shots._last_end, end);
              return true;
            });
            shots.forEach(function (elem) {
              var segment = $('<div class="shots-player-segments__time"></div>');
              var picture = $('<div class="shots-player-segments__picture"><img src="' + elem.img + '"></div>');
              var img = picture.find('img')[0];
              img.on('load', function () {
                picture.addClass('shots-player-segments__picture--loaded');
              });
              segment.css({
                left: elem.start_point / video.duration * 100 + '%',
                width: (elem.end_point - elem.start_point) / video.duration * 100 + '%'
              });
              picture.css({
                left: elem.start_point / video.duration * 100 + '%'
              });
              player_shots.append(segment);
              player_shots.append(picture);
              img.src = elem.screen;
              picture.on('click', function () {
                console.log('click shot', elem, elem.start_point);
                Lampa.PlayerVideo.to(elem.start_point);
              });
            });
            Lampa.PlayerPanel.render().find('.player-panel__timeline').before(player_shots);
          }
        });
      });
    }
    function playPlayer() {
      Lampa.PlayerVideo.play();
      Lampa.PlayerPanel.visible(false);
      Lampa.PlayerPanel.hide();
      playerPanel(false);
    }
    function pausePlayer() {
      Lampa.PlayerVideo.pause();
      Lampa.PlayerPanel.visible(false);
      Lampa.PlayerPanel.hide();
      playerPanel(true);
    }
    function closeModal() {
      Lampa.Modal.close();
      Lampa.Controller.toggle('player');
      Lampa.PlayerVideo.pause();
      playerPanel(true);
    }
    function beforeRecording() {
      if (Lampa.Modal.opened()) {
        Lampa.Modal.close();
        play_data.need_tocontent = true;
      }
      pausePlayer();
      var left = Date.now() - Lampa.Storage.get('shots_last_record', '0');
      if (left < Defined.quota_next_record) {
        return Lampa.Modal.open({
          html: Lampa.Template.get('shots_modal_quota_limit', {
            time: Lampa.Utils.secondsToTimeHuman((Defined.quota_next_record - left) / 1000)
          }),
          size: 'small',
          scroll: {
            nopadding: true
          },
          buttons: [{
            name: Lampa.Lang.translate('shots_button_good'),
            onSelect: closeModal
          }],
          onBack: closeModal
        });
      }
      Utils.modal(Lampa.Template.get('shots_modal_before_recording'), [{
        name: Lampa.Lang.translate('shots_start_recording'),
        onSelect: function onSelect() {
          Lampa.Modal.close();
          startRecording();
        }
      }, {
        name: Lampa.Lang.translate('shots_choice_start_point'),
        cancel: true,
        onSelect: function onSelect() {
          Lampa.Modal.close();
          Lampa.Controller.toggle('player_rewind');
          Lampa.PlayerPanel.visible(true);
          playerPanel(true);
        }
      }], closeModal);
    }
    function startRecording() {
      var recorder = new Recorder(Lampa.PlayerVideo.video());
      recorder.onStop = stopRecording;
      recorder.onError = errorRecording;
      recorder.onRun = playPlayer;
      recorder.start();
    }
    function errorRecording(e) {
      Utils.modal(Lampa.Template.get('shots_modal_error_recording'), [{
        name: Lampa.Lang.translate('shots_button_good'),
        onSelect: closeModal
      }], closeModal);
    }
    function stopRecording(recording) {
      pausePlayer();
      if (recording.duration > 10) {
        if (recording.start_point < 60 || recording.end_point > Lampa.PlayerVideo.video().duration - 60 * 5) {
          recording.near_border = true;
          Utils.modal(Lampa.Template.get('shots_modal_before_upload_recording'), [{
            name: Lampa.Lang.translate('shots_button_choice_fragment'),
            onSelect: closeModal
          }, {
            name: Lampa.Lang.translate('shots_button_continue_upload'),
            onSelect: function onSelect() {
              Lampa.Modal.close();
              startUploadRecording(recording);
            }
          }], closeModal);
        } else startUploadRecording(recording);
      } else shortRecording();
    }
    function startUploadRecording(recording) {
      var upload = new Upload({
        recording: recording,
        play_data: play_data
      });
      upload.onCancel = function () {
        Lampa.Controller.toggle('player');
        Lampa.PlayerVideo.pause();
      };
      upload.onComplete = function () {
        Lampa.Controller.toggle('player');
        Lampa.PlayerVideo.pause();
      };
      upload.start();
    }
    function shortRecording() {
      Utils.modal(Lampa.Template.get('shots_modal_short_recording'), [{
        name: Lampa.Lang.translate('shots_button_good'),
        onSelect: closeModal
      }], closeModal);
    }
    var Player = {
      init: init$2
    };

    var shots = {
      favorite: [],
      map: []
    };
    function init$1() {
      shots.favorite = Lampa.Storage.get('shots_favorite', '[]');
      createMap(Lampa.Storage.get('shots_map', '[]'));
      update();
      Lampa.Listener.follow('shots_status', updateStatus);
      Lampa.Listener.follow('shots_update', updateData);
      Lampa.Listener.follow('state:changed', function (e) {
        if (e.target == 'favorite' && (e.reason == 'profile' || e.reason == 'read')) {
          shots.favorite = [];
          createMap([]);
          update();
        }
      });
      Lampa.Socket.listener.follow('message', function (result) {
        if (result.method == 'update' && result.data.from == 'shots' && result.data.list == 'favorite') {
          update();
        }
      });
    }
    function createMap(arr) {
      shots.map = {};
      arr.forEach(function (id) {
        shots.map[id] = 1;
      });
    }
    function updateStatus(shot) {
      if (!shots.map[shot.id]) return;
      var find = shots.favorite.find(function (a) {
        return a.id == shot.id;
      });
      if (find) {
        find.status = shot.status;
        find.screen = shot.screen;
        find.file = shot.file;
        Lampa.Storage.set('shots_favorite', shots.favorite);
      }
    }
    function updateData(shot) {
      if (!shots.map[shot.id]) return;
      var find = shots.favorite.find(function (a) {
        return a.id == shot.id;
      });
      if (find) {
        find.liked = shot.liked;
        find.saved = shot.saved;
        Lampa.Storage.set('shots_favorite', shots.favorite);
      }
    }
    function update() {
      Api.shotsList('favorite', 1, function (shots) {
        shots.favorite = shots.results;
        Lampa.Storage.set('shots_favorite', shots.favorite);
      });
      Api.shotsList('map', 1, function (map) {
        createMap(map.results);
        Lampa.Storage.set('shots_map', map.results);
      });
    }
    function add$1(shot) {
      var clone = {};
      Object.assign(clone, shot);
      delete clone.params;
      Lampa.Arrays.insert(shots.favorite, 0, clone);
      if (shots.favorite.length > 20) {
        shots.favorite = shots.favorite.slice(0, 20);
      }
      shots.map[clone.id] = 1;
      Lampa.Storage.set('shots_favorite', shots.favorite);
      Lampa.Storage.add('shots_map', clone.id);
    }
    function remove$1(shot) {
      var find_in = shots.favorite.find(function (a) {
        return a.id == shot.id;
      });
      if (find_in) Lampa.Arrays.remove(shots.favorite, find_in);
      delete shots.map[shot.id];
      Lampa.Storage.set('shots_favorite', shots.favorite);
      var map = Lampa.Storage.get('shots_map', '[]');
      Lampa.Arrays.remove(map, shot.id);
      Lampa.Storage.set('shots_map', map);
    }
    function page(page, callback) {
      Api.shotsList('favorite', page, function (shots) {
        callback(shots.results);
      }, function () {
        callback([]);
      });
    }
    function get() {
      return Lampa.Arrays.clone(shots.favorite);
    }
    function find$1(shot_id) {
      return Boolean(shots.map[shot_id]);
    }
    function toggle$1(shot, onsuccess, onerror) {
      var finded = find$1(shot.id);
      Api.shotsFavorite(finded ? 'remove' : 'add', shot, function () {
        if (finded) {
          remove$1(shot);
        } else {
          add$1(shot);
        }
        if (onsuccess) onsuccess(finded);
        Lampa.Socket.send('update', {
          params: {
            from: 'shots',
            list: 'favorite'
          }
        });
      }, onerror);
      return !finded;
    }
    var Favorite = {
      init: init$1,
      update: update,
      remove: remove$1,
      add: add$1,
      get: get,
      find: find$1,
      toggle: toggle$1,
      page: page
    };

    var loaded_last = {};
    function start(call) {
      var status = new Lampa.Status(3);
      status.onComplite = function () {
        // Сохраняем последние загруженные шоты для фильтрации релевантных
        loaded_last["new"] = status.data["new"];
        loaded_last.popular = status.data.popular;

        // Фильтруем просмотренные шоты
        status.data["new"] = filterViewed(status.data["new"]);
        status.data.popular = filterViewed(status.data.popular);
        console.log('Shots', 'roll items', 'new', status.data["new"].length, 'popular', status.data.popular.length, 'old', status.data.old.length);

        // Убираем дубли между новыми и популярными и старыми
        status.data.popular = status.data.popular.filter(function (a) {
          return !status.data["new"].find(function (b) {
            return b.id == a.id;
          });
        });
        status.data.old = status.data.old.filter(function (a) {
          return !(status.data["new"].find(function (b) {
            return b.id == a.id;
          }) || status.data.popular.find(function (b) {
            return b.id == a.id;
          }));
        });
        console.log('Shots', 'after filter roll items', 'new', status.data["new"].length, 'popular', status.data.popular.length, 'old', status.data.old.length);

        // Собираем итоговый список
        var items = [].concat(status.data["new"], status.data.popular);

        // Перемешиваем новые и популярные
        items = Lampa.Arrays.shuffle(items);

        // Добавляем метку from_id для старых шотов
        status.data.old.forEach(function (a) {
          return a.from_id = a.id;
        });

        // Добавляем релевантные старые шоты
        items = items.concat(filterViewed(filterRelevant(status.data.old)));
        console.log('Shots', 'relevant roll items', items.length);

        // Если нет шотов, добавляем несколько старых
        if (!items.length) items = status.data.old.slice(-5);
        call(items);
      };
      Api.lenta({
        sort: 'new',
        limit: 50
      }, status.append.bind(status, 'new'));
      Api.lenta({
        sort: 'popular',
        limit: 50
      }, status.append.bind(status, 'popular'));
      Api.lenta({
        sort: 'from_id',
        id: Lampa.Storage.get('shots_lenta_last_id', '0'),
        limit: 50
      }, status.append.bind(status, 'old'));
    }
    function filterRelevant(items) {
      return items.filter(function (a) {
        return !(loaded_last["new"].find(function (b) {
          return b.id == a.id;
        }) || loaded_last.popular.find(function (b) {
          return b.id == a.id;
        }));
      });
    }
    function filterViewed(items) {
      var viewed = Lampa.Storage.cache('shots_viewed', 2000, []);
      var filtred = items.filter(function (a) {
        return viewed.indexOf(a.id) == -1;
      });
      return filtred;
    }
    function next(call) {
      Api.lenta({
        sort: 'from_id',
        id: Lampa.Storage.get('shots_lenta_last_id', '0'),
        limit: 50
      }, function (items) {
        return call(filterRelevant(items));
      });
    }
    function viewedRegister(shot) {
      if (!shot.from_id) Lampa.Storage.add('shots_viewed', shot.id);
      Api.shotsViewed(shot.id);
    }
    function saveFromId(id) {
      Lampa.Storage.set('shots_lenta_last_id', id);
    }
    var Roll = {
      start: start,
      next: next,
      viewedRegister: viewedRegister,
      saveFromId: saveFromId
    };

    function Video() {
      this.html = Lampa.Template.js('shots_lenta_video');
      this.video = this.html.find('video');
      this.progress = this.html.find('.shots-lenta-video__progress-bar div');
      this.layer = this.html.find('.shots-lenta-video__layer');
      this.loader = this.html.find('.shots-lenta-video__loader');
      this.viewed = {};
      this.create = function () {
        var _this = this;
        this.video.addEventListener('timeupdate', function () {
          _this.progress.style.width = _this.video.currentTime / _this.video.duration * 100 + '%';
          if ((_this.video.currentTime / _this.video.duration > 0.1 || _this.video.currentTime > 2) && !_this.viewed[_this.shot.id]) {
            _this.viewed[_this.shot.id] = true;
            Roll.viewedRegister(_this.shot);
          }
          Lampa.Screensaver.resetTimer();
        });
        this.video.addEventListener('waiting', function () {
          _this.showLoading();
        });
        this.video.addEventListener('playing', function () {
          _this.hideLoading();
        });
        this.layer.on('click', function () {
          _this.video.paused ? _this.play() : _this.pause();
        });
        if (Lampa.Platform.is('apple')) this.video.setAttribute('playsinline', 'true');
      };
      this.change = function (shot) {
        this.shot = shot;
        if (shot.from_id) Roll.saveFromId(shot.from_id);
        this.video.setAttribute('poster', shot.img || './img/video_poster.png');
        this.progress.style.width = '0%';
        this.pause();
        this.load();
        this.play();
      };
      this.play = function () {
        var playPromise;
        try {
          playPromise = this.video.play();
        } catch (e) {}
        if (playPromise !== undefined) {
          playPromise.then(function () {
            console.log('Lenta', 'start plaining');
          })["catch"](function (e) {
            console.log('Lenta', 'play promise error:', e.message);
          });
        }
      };
      this.pause = function () {
        var pausePromise;
        try {
          pausePromise = this.video.pause();
        } catch (e) {}
        if (pausePromise !== undefined) {
          pausePromise.then(function () {
            console.log('Lenta', 'pause');
          })["catch"](function (e) {
            console.log('Lenta', 'pause promise error:', e.message);
          });
        }
      };
      this.load = function () {
        this.video.src = '';
        this.video.load();
        this.video.src = this.shot.file;
        this.video.load();
      };
      this.showLoading = function () {
        var _this2 = this;
        this.timer_loading = setTimeout(function () {
          _this2.loader.addClass('show');
        }, 2000);
      };
      this.hideLoading = function () {
        clearTimeout(this.timer_loading);
        this.loader.removeClass('show');
      };
      this.render = function () {
        return this.html;
      };
      this.destroy = function () {
        clearTimeout(this.timer_loading);
        this.html.remove();
        this.viewed = {};
      };
    }

    function Author() {
      var _this = this;
      var author_data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.html = Lampa.Template.js('shots_author');
      this.img = this.html.find('img');
      this.box = this.html.find('.shots-author__img');
      this.img.onload = function () {
        _this.box.addClass('loaded');
      };
      this.img.onerror = function () {
        _this.img.src = './img/img_broken.svg';
      };
      this.create = function () {
        if (author_data) this.update(author_data);
      };
      this.update = function (data) {
        this.box.removeClass('loaded');
        var email = data.email;
        var icon = data.icon;
        if (!email) {
          email = Lampa.Account.Permit.account.email;
          icon = Lampa.Account.Permit.account.profile ? Lampa.Account.Permit.account.profile.icon : '';
        }
        this.img.src = Lampa.Utils.protocol() + Lampa.Manifest.cub_domain + '/img/profiles/' + (icon || 'l_1') + '.png';
        this.html.find('.shots-author__name').text(Lampa.Utils.capitalizeFirstLetter((email || 'Unknown').split('@')[0]));
      };
      this.render = function () {
        return this.html;
      };
      this.destroy = function () {
        this.img.onload = null;
        this.img.onerror = null;
        this.html.remove();
      };
    }

    function find(shot_id) {
      return Boolean(Lampa.Storage.get('shots_likes', '[]').find(function (id) {
        return shot_id == id;
      }));
    }
    function add(shot_id) {
      var arr = Lampa.Storage.cache('shots_likes', 100, '[]');
      arr.push(shot_id);
      Lampa.Storage.set('shots_likes', arr);
    }
    function remove(shot_id) {
      var arr = Lampa.Storage.get('shots_likes', '[]');
      Lampa.Arrays.remove(arr, shot_id);
      Lampa.Storage.set('shots_likes', arr);
    }
    function toggle(shot_id, onsuccess, onerror) {
      var finded = find(shot_id);
      Api.shotsLiked(shot_id, finded ? 'unlike' : 'like', function () {
        if (finded) {
          remove(shot_id);
        } else {
          add(shot_id);
        }
        if (onsuccess) onsuccess(finded);
      }, onerror);
      return !finded;
    }
    var Likes = {
      find: find,
      add: add,
      remove: remove,
      toggle: toggle
    };

    function shotsReport(id, callback) {
      Lampa.Modal.open({
        html: Lampa.Template.get('shots_modal_report'),
        size: 'small',
        scroll: {
          nopadding: true
        },
        buttons: [{
          name: Lampa.Lang.translate('shots_button_report'),
          onSelect: function onSelect() {
            Lampa.Modal.close();
            callback && callback();
            var reports = Lampa.Storage.get('shots_reports', '[]');
            if (reports.indexOf(id) == -1) {
              Api.shotsReport(id, function () {
                reports.push(id);
                Lampa.Storage.set('shots_reports', reports);
                Lampa.Bell.push({
                  icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
                  text: Lampa.Lang.translate('shots_modal_report_bell')
                });
              });
            } else {
              Lampa.Bell.push({
                icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
                text: Lampa.Lang.translate('shots_modal_report_bell_alreadyed')
              });
            }
          }
        }],
        onBack: function onBack() {
          Lampa.Modal.close();
          callback && callback();
        }
      });
    }
    function shotsDelete(id, callback) {
      Lampa.Modal.open({
        html: Lampa.Template.get('shots_modal_delete'),
        size: 'small',
        scroll: {
          nopadding: true
        },
        buttons: [{
          name: Lampa.Lang.translate('shots_button_delete_video'),
          onSelect: function onSelect() {
            Lampa.Modal.close();
            callback && callback();
            var deleted = Lampa.Storage.get('shots_deleted', '[]');
            if (deleted.indexOf(id) == -1) {
              Api.shotsDelete(id, function () {
                deleted.push(id);
                Lampa.Storage.set('shots_deleted', deleted);
                Lampa.Bell.push({
                  icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
                  text: Lampa.Lang.translate('shots_modal_deleted_bell')
                });
              });
            } else {
              Lampa.Bell.push({
                icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
                text: Lampa.Lang.translate('shots_modal_deleted_bell')
              });
            }
          }
        }],
        onBack: function onBack() {
          Lampa.Modal.close();
          callback && callback();
        }
      });
    }
    var Modals = {
      shotsReport: shotsReport,
      shotsDelete: shotsDelete
    };

    function backward$1() {
      var head = Lampa.Template.get('head_backward', {
        title: ''
      });
      head.find('.head-backward__button').on('click', function () {
        Lampa.Controller.back();
      });
      return head;
    }
    function Slides(params) {
      var html = $("<div class=\"shots-slides\">\n        <div class=\"shots-slides__slides\"></div>\n        <div class=\"shots-slides__install\">".concat(Lampa.Lang.translate(params.button_text), "</div>\n        <div class=\"shots-slides__down\">").concat(Lampa.Lang.translate('shots_down'), "</div>\n    </div>"));
      params.slides.forEach(function (slide_data, slide_index) {
        html.find('.shots-slides__slides').append($("<img class=\"shots-slides__slide slide-".concat(slide_index + 1, "\">")));
      });
      var slide = 0;
      var total = params.slides.length;
      var timeload;
      var cancel = false;
      var down = html.find('.shots-slides__down');
      var install = html.find('.shots-slides__install');
      if (Lampa.Platform.mouse() || Lampa.Utils.isTouchDevice()) {
        html.append(backward$1());
      }
      $('body').append(html);
      var push = function push() {
        if (slide == total) {
          destroy();
          params.onInstall && params.onInstall();
        }
      };
      var next = function next() {
        if (slide >= total) return;
        if (slide > 0) {
          html.find('.slide-' + slide).addClass('up');
        }
        slide++;
        html.find('.slide-' + slide).addClass('active');
        if (slide === total) {
          down.removeClass('active');
          setTimeout(function () {
            install.addClass('active');
          }, 500);
        }
      };
      var start = function start() {
        Lampa.Loading.stop();
        setTimeout(function () {
          down.addClass('active');
        }, 600);
        next();
        Lampa.Controller.add('shots_present', {
          toggle: function toggle() {
            Lampa.Controller.clear();
            Lampa.Background.theme('#08090D');
          },
          enter: push,
          down: next,
          back: stop
        });
        Lampa.Controller.toggle('shots_present');
      };
      var stop = function stop() {
        destroy();
        Lampa.Loading.stop();
        params.onBack && params.onBack();
      };
      var preload = function preload() {
        var slides_loaded = 0;
        for (var i = 1; i <= total; i++) {
          var img = html.find('.slide-' + i)[0];
          img.src = params.slides[i - 1];
          img.onload = function () {
            slides_loaded++;
            if (slides_loaded === total && !cancel) {
              params.onLoad && params.onLoad();
              start();
              clearTimeout(timeload);
            }
          };
        }
        timeload = setTimeout(stop, 10000);
      };
      var destroy = function destroy() {
        start = function start() {};
        cancel = true;
        clearTimeout(timeload);
        html.remove();
        Lampa.Background.theme('reset');
      };
      down.on('click', next);
      install.on('click', push);
      Lampa.Loading.start(stop);
      preload();
    }

    function Panel() {
      this.html = Lampa.Template.js('shots_lenta_panel');
      this.network = new Lampa.Reguest();
      this.cache = {};
      this.image = this.html.find('.shots-lenta-panel__card-img');
      this.title = this.html.find('.shots-lenta-panel__card-title');
      this.recorder = this.html.find('.shots-lenta-panel__recorder');
      this.year = this.html.find('.shots-lenta-panel__card-year');
      this.cardbox = this.html.find('.shots-lenta-panel__card');
      this.body = this.html.find('.explorer-card__head-body');
      this.last = this.html.find('.selector');
      this.poster = this.image.find('img');
      this.create = function () {
        var _this = this;
        this.tags = new Tags$1();
        this.author = new Author();
        var waite_like = false,
          waite_fav = false;
        this.author.render().addClass('selector');
        this.html.find('.shots-lenta-panel__tags').append(this.tags.render());
        this.html.find('.shots-lenta-panel__author').append(this.author.render());
        this.poster.onload = function () {
          _this.image.addClass('loaded');
        };
        this.poster.onerror = function () {
          _this.poster.src = './img/img_broken.svg';
        };
        Array.from(this.html.querySelectorAll('.selector')).forEach(function (button) {
          button.on('hover:focus hover:hover hover:touch', function () {
            _this.last = button;
          });
        });
        this.html.find('.action-liked').on('hover:enter', function () {
          if (waite_like) return;
          waite_like = true;
          Likes.toggle(_this.shot.id, function (ready) {
            _this.shot.liked += ready ? -1 : 1;
            Lampa.Listener.send('shots_update', _objectSpread2({}, _this.shot));
            _this.update();
            waite_like = false;
          });
        });
        this.html.find('.action-favorite').on('hover:enter', function () {
          if (waite_fav) return;
          waite_fav = true;
          Favorite.toggle(_this.shot, function (ready) {
            _this.shot.saved += ready ? -1 : 1;
            Lampa.Listener.send('shots_update', _objectSpread2({}, _this.shot));
            _this.update();
            waite_fav = false;
          });
        });
        this.html.find('.shots-author').on('hover:enter', function () {
          Lampa.Controller.back();
          Lampa.Activity.push({
            url: '',
            component: 'shots_channel',
            title: 'Shots - ' + Lampa.Utils.capitalizeFirstLetter(_this.shot.email),
            id: _this.shot.cid,
            name: _this.shot.email,
            page: 1
          });
        });
        this.html.find('.action-more').on('hover:enter', this.menu.bind(this));
        this.image.on('hover:enter', function () {
          Lampa.Controller.back();
          Lampa.Activity.push({
            url: '',
            component: 'full',
            source: 'tmdb',
            id: _this.shot.card_id,
            method: _this.shot.card_type,
            card: {
              id: _this.shot.card_id
            }
          });
        });
      };
      this.menu = function () {
        var _this2 = this;
        var menu = [];
        var controller = Lampa.Controller.enabled().controller.link;
        var back = function back() {
          controller.html.removeClass('hide');
          Lampa.Controller.toggle('shots_lenta');
          controller.video.play();
          Lampa.Background.theme('black');
        };
        menu.push({
          title: Lampa.Lang.translate('shots_button_report'),
          onSelect: function onSelect() {
            Modals.shotsReport(_this2.shot.id, back);
          }
        });
        if (Lampa.Account.Permit.account.id == this.shot.cid || Lampa.Account.Permit.account.id == 1) {
          menu.push({
            title: Lampa.Lang.translate('shots_button_delete_video'),
            onSelect: function onSelect() {
              Modals.shotsDelete(_this2.shot.id, function () {
                back();
                Created.remove(_this2.shot);
              });
            }
          });
        }
        menu.push({
          title: Lampa.Lang.translate('more'),
          separator: true
        });
        menu.push({
          title: Lampa.Lang.translate('shots_how_create_video_title'),
          subtitle: Lampa.Lang.translate('shots_how_create_video_subtitle'),
          onSelect: function onSelect() {
            Slides({
              slides: [1, 2, 3, 4].map(function (i) {
                return Defined.cdn + 'record/slide-' + i + '.jpg';
              }),
              button_text: 'shots_button_good',
              onLoad: function onLoad() {
                controller.html.addClass('hide');
              },
              onInstall: back,
              onBack: back
            });
          }
        });
        controller.video.pause();
        Lampa.Select.show({
          title: Lampa.Lang.translate('title_action'),
          items: menu,
          onBack: function onBack() {
            Lampa.Controller.toggle('shots_lenta');
            controller.video.play();
          }
        });
      };
      this.update = function () {
        this.html.find('.action-liked').toggleClass('active', Likes.find(this.shot.id));
        this.html.find('.action-favorite').toggleClass('active', Favorite.find(this.shot.id));
        this.tags.update(this.shot);
        if (this.shot.tags && this.shot.tags.length) {
          var elem_tags = $('<div>' + this.shot.tags.slice(0, 3).map(function (t) {
            return '#' + Lampa.Lang.translate('shots_tag_' + t.slug);
          }).join(' ') + '</div>');
          this.tags.render().append(elem_tags);
        }
        var elem_likes = $('<div><svg><use xlink:href="#sprite-love"></use></svg> ' + Lampa.Utils.bigNumberToShort(this.shot.liked || 0) + '</div>');
        var elem_saved = $('<div><svg><use xlink:href="#sprite-favorite"></use></svg> ' + Lampa.Utils.bigNumberToShort(this.shot.saved || 0) + '</div>');
        elem_likes.toggleClass('hide', (this.shot.liked || 0) == 0);
        elem_saved.toggleClass('hide', (this.shot.saved || 0) == 0);
        this.tags.render().append(elem_likes);
        this.tags.render().append(elem_saved);
        if (Lampa.Account.Permit.account.id == 1) this.recorder.text(this.shot.recorder || '').toggleClass('hide', !this.shot.recorder);
      };
      this.change = function (shot) {
        this.shot = shot;
        this.author.update(shot);
        this.network.clear();
        this.load();
        this.update();
      };
      this.load = function () {
        this.image.removeClass('loaded');
        this.cardbox.addClass('loading');
        if (this.cache[this.shot.id]) return this.loadDone(this.cache[this.shot.id]);
        var url = Lampa.TMDB.api(this.shot.card_type + '/' + this.shot.card_id + '?api_key=' + Lampa.TMDB.key() + '&language=' + Lampa.Storage.field('tmdb_lang'));
        this.network.silent(url, this.loadDone.bind(this));
      };
      this.loadDone = function (card) {
        this.shot.card_title = card.title || card.name || card.original_title || card.original_name;
        this.shot.card_poster = card.poster_path || card.backdrop_path;
        this.shot.card_year = (card.release_date || card.first_air_date || '----').slice(0, 4);
        this.title.text(this.shot.card_title);
        this.year.text(this.shot.card_year);
        this.poster.src = Lampa.TMDB.image('t/p/w300/' + this.shot.card_poster);
        this.cardbox.removeClass('loading');
        this.cache[this.shot.id] = card;
      };
      this.render = function () {
        return this.html;
      };
      this.destroy = function () {
        clearTimeout(this.show_timeout);
        this.html.remove();
        this.cache = {};
        this.network.clear();
      };
    }

    function Lenta(first, playlist) {
      this.html = Lampa.Template.js('shots_lenta');
      this.current = first;
      this.playlist = playlist || [];
      this.position = playlist.indexOf(playlist.find(function (i) {
        return i.id == first.id;
      }));
      this.page = 1;
      this.start = function () {
        this.video = new Video(this.current);
        this.panel = new Panel(this.current);
        this.video.create();
        this.panel.create();
        if (Lampa.Platform.mouse() || Lampa.Utils.isTouchDevice()) {
          var head = Lampa.Template.js('head_backward', {
            title: ''
          });
          head.find('.head-backward__button').on('click', Lampa.Controller.back.bind(Lampa.Controller));
          this.html.append(head);
        }
        this.html.find('.shots-lenta__video').append(this.video.render());
        this.html.find('.shots-lenta__panel').append(this.panel.render());
        $('body').addClass('ambience--enable').append(this.html);
        this.video.change(this.current, 'next');
        this.panel.change(this.current, 'next');
        this.controller();
        this.scroll();
        this.html.on('mousemove', this.focus.bind(this));
        Lampa.Background.theme('black');
        Metric.counter('shots_lenta_launch');
      };
      this.scroll = function () {
        var _self = this;
        if (Lampa.Utils.isTouchDevice()) {
          var movestart = function movestart(e) {
            start_position = e.clientY;
            end_position = start_position;
            move_position = start_position;
            time_scroll = Date.now();
          };
          var move = function move(e) {
            move_position = e.clientY;
            end_position = e.clientY;
            var delta = move_position - start_position;
            elemmove.style.transform = 'translateY(' + delta + 'px)';
          };
          var moveend = function moveend(e) {
            elemmove.style.transform = 'translateY(0px)';
            var threshold = window.innerHeight / 2.5;
            var csroll_speed = Date.now() - time_scroll;
            if (csroll_speed < 200) {
              threshold = threshold / 6;
            }
            if (start_position - end_position > threshold) {
              _self.move('next');
            } else if (end_position - start_position > threshold) {
              _self.move('prev');
            }
            end_position = 0;
            start_position = 0;
            move_position = 0;
          };
          var start_position = 0;
          var move_position = 0;
          var end_position = 0;
          var time_scroll = 0;
          var elemmove = this.html.find('.shots-lenta-video__video-element');
          this.html.addEventListener('touchstart', function (e) {
            movestart(e.touches[0] || e.changedTouches[0]);
          });
          this.html.addEventListener('touchmove', function (e) {
            move(e.touches[0] || e.changedTouches[0]);
          });
          this.html.addEventListener('touchend', moveend);
        } else {
          var wheel = function wheel(e) {
            if (Date.now() - time > 500) {
              time = Date.now();
              if (e.wheelDelta / 120 > 0) {
                _self.move('prev');
              } else {
                _self.move('next');
              }
            }
          }; // Обрабатываем скролл колесом мыши
          var time = 0;
          this.html.addEventListener('mousewheel', wheel);
          this.html.addEventListener('wheel', wheel);
        }
      };
      this.focus = function () {
        var _this = this;
        if (Lampa.Utils.isTouchDevice()) return;
        clearTimeout(this.focus_timeout);
        this.html.toggleClass('shots-lenta--hide-panel', false);
        this.focus_timeout = setTimeout(function () {
          if (Lampa.Controller.enabled().name !== 'shots_lenta') return;
          _this.html.toggleClass('shots-lenta--hide-panel', true);
          Lampa.Controller.add('shots_lenta_idle', {
            link: _this.video,
            toggle: function toggle() {
              Lampa.Controller.clear();
            },
            left: _this.controller.bind(_this),
            right: _this.controller.bind(_this),
            up: function up() {
              _this.move('prev');
              _this.focus();
            },
            down: function down() {
              _this.move('next');
              _this.focus();
            },
            enter: _this.controller.bind(_this),
            back: _this.controller.bind(_this)
          });
          Lampa.Controller.toggle('shots_lenta_idle');
        }, 7000);
      };
      this.controller = function () {
        var _this2 = this;
        Lampa.Controller.add('shots_lenta', {
          link: this,
          toggle: function toggle() {
            Lampa.Controller.clear();
            Lampa.Controller.collectionSet(_this2.html);
            Lampa.Controller.collectionFocus(_this2.panel.body, _this2.html);
            _this2.focus();
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');
            _this2.focus();
          },
          right: function right() {
            if (Navigator.canmove('right')) Navigator.move('right');
            _this2.focus();
          },
          up: function up() {
            _this2.move('prev');
            _this2.focus();
          },
          down: function down() {
            _this2.move('next');
            _this2.focus();
          },
          back: this.back.bind(this)
        });
        Lampa.Controller.toggle('shots_lenta');
      };
      this.move = function (direction) {
        var start_position = this.position;
        if (direction == 'next') {
          this.position++;
          if (this.position >= this.playlist.length) {
            this.position = this.playlist.length - 1;
          }
        } else if (direction == 'prev') {
          this.position--;
          if (this.position < 0) {
            this.position = 0;
          }
        }
        if (start_position !== this.position) {
          this.current = this.playlist[this.position];
          this.video.change(this.current, direction);
          this.panel.change(this.current, direction);
          Lampa.Controller.toggle('shots_lenta');
          Metric.counter('shots_lenta_next');
        }
        if (this.position >= this.playlist.length - 3) {
          this.nextPart();
        }
      };
      this.nextPart = function () {
        var _this3 = this;
        if (this.onNext) {
          this.loading_part = true;
          this.page++;
          this.onNext(this.page, function (results) {
            _this3.loading_part = false;
            if (results && results.length) {
              results.forEach(function (i) {
                if (!_this3.playlist.find(function (p) {
                  return p.id == i.id;
                })) _this3.playlist.push(i);
              });
            }
          });
        }
      };
      this.back = function () {
        this.destroy();
        Lampa.Controller.toggle('content');
      };
      this.destroy = function () {
        clearTimeout(this.focus_timeout);
        this.video.destroy();
        this.panel.destroy();
        this.html.remove();
        Lampa.Background.theme('reset');
      };
    }

    function Shot(item_data) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var clone = Lampa.Arrays.clone(item_data);
      item_data.card = {
        id: item_data.card_id,
        type: item_data.card_type,
        title: item_data.card_title,
        release_date: item_data.card_year,
        poster_path: item_data.card_poster
      };
      item_data.img = item_data.screen;
      var item = Lampa.Maker.make('Episode', item_data, function (module) {
        return module.only('Card', 'Callback');
      });
      item.use({
        onCreate: function onCreate() {
          var _this = this;
          this.html.find('.full-episode__name').remove();
          this.html.find('.full-episode__num').remove();
          if (params.without_card) this.html.find('.card-episode__footer').addClass('hide');
          var tags = new Tags$1(this.data);
          tags.create();
          this.html.find('.full-episode__date').empty().append(tags.render());
          this.html.addClass('full-episode--shot');
          this.liked = $("\n                <div class=\"full-episode__liked\">\n                    <svg><use xlink:href=\"#sprite-love\"></use></svg>\n                    <span>".concat(Lampa.Utils.bigNumberToShort(this.data.liked), "</span>\n                </div>\n            "));
          this.html.find('.full-episode__date').append(this.liked);
          this.status = Lampa.Template.elem('div', {
            "class": 'shots-status hide'
          });
          this.html.find('.card__left').append(this.status);
          this.html.find('.full-episode').append($('<div class="full-episode__shot-icon"><svg><use xlink:href="#sprite-shots"></use></svg></div>'));
          this.updateStatusHandler = function (e) {
            if (e.id !== _this.data.id) return;
            _this.status.toggleClass('hide', e.status == 'ready');
            _this.status.toggleClass('shots-status--error', e.status == 'error');
            _this.status.toggleClass('shots-status--processing', e.status == 'processing' || e.status == 'converting');
            _this.status.toggleClass('shots-status--ready', e.status == 'ready');
            _this.status.toggleClass('shots-status--deleted', e.status == 'deleted');
            _this.status.toggleClass('shots-status--blocked', e.status == 'blocked');
            _this.status.text(e.status == 'error' ? Lampa.Lang.translate('shots_status_error') : e.status == 'processing' || e.status == 'converting' ? Lampa.Lang.translate('shots_status_processing') : e.status == 'blocked' ? Lampa.Lang.translate('shots_status_blocked') : e.status == 'deleted' ? Lampa.Lang.translate('shots_status_deleted') : e.status == 'ready' ? Lampa.Lang.translate('shots_status_ready') : '');
            Utils.videoReplaceStatus(e, _this.data);
            Utils.videoReplaceStatus(e, clone);
            _this.data.img = e.screen;
            if (e.screen) _this.emit('visible');
          };
          this.updateDataHandler = function (e) {
            if (e.id !== _this.data.id) return;
            _this.liked.find('span').text(Lampa.Utils.bigNumberToShort(e.liked || _this.data.liked));
          };
          Lampa.Listener.follow('shots_status', this.updateStatusHandler);
          Lampa.Listener.follow('shots_update', this.updateDataHandler);
          this.updateStatusHandler(this.data);
          if (this.data.status == 'processing' && Lampa.Account.Permit.account.id == this.data.cid) Handler.add(clone);
        },
        onlyEnter: function onlyEnter() {
          var lenta = new Lenta(clone, params.playlist || [this.data]);
          lenta.onNext = params.onNext;
          lenta.start();
        },
        onlyFocus: function onlyFocus() {
          Lampa.Background.change(this.data.img || '');
        },
        onRemove: function onRemove() {
          Lampa.Listener.remove('shots_status', this.updateStatusHandler);
          Lampa.Listener.remove('shots_update', this.updateDataHandler);
        }
      });
      return item;
    }

    function component$3(object) {
      Lampa.Utils.extendParams(object, {
        items: {
          cols: 4
        }
      });
      var comp = Lampa.Maker.make('Category', object, function (module) {
        return module.toggle(Lampa.Maker.module('Category').MASK.base, 'Pagination');
      });
      var playlist = [];
      comp.use({
        onCreate: function onCreate() {
          var _this = this;
          Api.shotsList(object.url, object.page, function (result) {
            playlist = Lampa.Arrays.clone(result.results);
            _this.build(result);
          }, this.empty.bind(this));
        },
        onNext: function onNext(resolve, reject) {
          Api.shotsList(object.url, object.page, function (result) {
            playlist = playlist.concat(result.results);
            resolve(result);
          }, reject.bind(this));
        },
        onlyCreateAndAppend: function onlyCreateAndAppend(element) {
          try {
            var item = new Shot(element, {
              playlist: playlist
            });
            this.emit('instance', item, element);
            item.create();
            this.emit('append', item, element);
          } catch (e) {
            console.warn('Warning', 'onCreateAndAppend error:', e.message, e.stack);
          }
        },
        onDestroy: function onDestroy() {
          playlist = null;
        }
      });
      return comp;
    }

    function component$2(object) {
      Lampa.Utils.extendParams(object, {
        items: {
          cols: Lampa.Storage.field('interface_size') == 'bigger' ? 4 : 3
        },
        empty: {
          descr: Lampa.Lang.translate('shots_card_empty_descr'),
          buttons: [{
            title: Lampa.Lang.translate('shots_how_create_video_title'),
            onEnter: function onEnter() {
              Slides({
                slides: [1, 2, 3, 4].map(function (i) {
                  return Defined.cdn + 'record/slide-' + i + '.jpg';
                }),
                button_text: 'shots_button_good',
                onLoad: function onLoad() {},
                onInstall: function onInstall() {
                  Lampa.Controller.toggle('content');
                },
                onBack: function onBack() {
                  Lampa.Controller.toggle('content');
                }
              });
            }
          }]
        }
      });
      var comp = Lampa.Maker.make('Category', object, function (module) {
        return module.toggle(Lampa.Maker.module('Category').MASK.base, 'Pagination', 'Explorer');
      });
      var playlist = [];
      comp.use({
        onCreate: function onCreate() {
          var _this = this;
          Api.shotsCard(object.card, object.page, function (result) {
            playlist = Lampa.Arrays.clone(result.results);
            _this.build(result);
          }, this.empty.bind(this));
        },
        onNext: function onNext(resolve, reject) {
          Api.shotsCard(object.card, object.page, function (result) {
            playlist = playlist.concat(result.results);
            resolve(result);
          }, reject.bind(this));
        },
        onlyCreateAndAppend: function onlyCreateAndAppend(element) {
          try {
            var item = new Shot(element, {
              playlist: playlist,
              without_card: true
            });
            this.emit('instance', item, element);
            item.create();
            this.emit('append', item, element);
          } catch (e) {
            console.warn('Warning', 'onCreateAndAppend error:', e.message, e.stack);
          }
        },
        onDestroy: function onDestroy() {
          playlist = null;
        }
      });
      return comp;
    }

    function component$1(object) {
      Lampa.Utils.extendParams(object, {
        items: {
          cols: 4
        }
      });
      var comp = Lampa.Maker.make('Category', object, function (module) {
        return module.toggle(Lampa.Maker.module('Category').MASK.base, 'Pagination');
      });
      var playlist = [];
      comp.use({
        onCreate: function onCreate() {
          var _this = this;
          Api.shotsChannel(object.id, object.page, function (result) {
            playlist = Lampa.Arrays.clone(result.results);
            _this.build(result);
          }, this.empty.bind(this));
        },
        onNext: function onNext(resolve, reject) {
          Api.shotsChannel(object.id, object.page, function (result) {
            playlist = playlist.concat(result.results);
            resolve(result);
          }, reject.bind(this));
        },
        onlyCreateAndAppend: function onlyCreateAndAppend(element) {
          try {
            var item = new Shot(element, {
              playlist: playlist
            });
            this.emit('instance', item, element);
            item.create();
            this.emit('append', item, element);
          } catch (e) {
            console.warn('Warning', 'onCreateAndAppend error:', e.message, e.stack);
          }
        },
        onDestroy: function onDestroy() {
          playlist = null;
        }
      });
      return comp;
    }

    function backward() {
      var head = Lampa.Template.get('head_backward', {
        title: ''
      });
      head.find('.head-backward__button').on('click', function () {
        Lampa.Controller.back();
      });
      return head;
    }
    function Present() {
      this.onComplete = function () {};
      this.onBack = function () {};
      this.start = function () {
        var _this = this;
        var last_time_watched = Lampa.Storage.get('shots_present_watched', '0');
        var wait_time = 1000 * 60 * 60 * 24 * 30; // 5 дней

        if (Date.now() - last_time_watched < wait_time) {
          return this.onComplete();
        }
        Lampa.Background.theme('black');
        this.html = $("<div class=\"shots-video-present\">\n            <video autoplay poster=\"./img/video_poster.png\"></video>\n        </div>");
        if (Lampa.Platform.mouse() || Lampa.Utils.isTouchDevice()) {
          this.html.append(backward());
        }
        this.video = this.html.find('video')[0];
        if (Lampa.Platform.is('apple')) this.video.setAttribute('playsinline', 'true');
        this.video.src = 'https://cdn.cub.rip/shots_present/present.mp4';
        this.video.load();
        this.video.addEventListener('ended', this.stop.bind(this));
        this.video.addEventListener('error', this.stop.bind(this));
        this.video.addEventListener('timeupdate', function () {
          clearTimeout(_this.timer_waite);
        });
        this.timer_waite = setTimeout(this.stop.bind(this), 6000);
        $('body').append(this.html);
        Lampa.Controller.add('shots_video_present', {
          toggle: function toggle() {
            Lampa.Controller.clear();
          },
          back: this.back.bind(this)
        });
        Lampa.Controller.toggle('shots_video_present');
      };
      this.stop = function () {
        this.onComplete();
        Lampa.Storage.set('shots_present_watched', Date.now());
      };
      this.back = function () {
        this.onBack();
      };
      this.destroy = function () {
        this.stop = function () {};
        this.onComplete = function () {};
        this.onBack = function () {};
        if (!this.video) return;
        this.video.pause();
        this.video.src = '';
        clearTimeout(this.timer_waite);
        this.html.remove();
        Lampa.Background.theme('reset');
      };
    }

    var component = 'shots';
    var icon = "<svg id=\"sprite-shots\" viewBox=\"0 0 512 512\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M253.266 512a19.166 19.166 0 0 1-19.168-19.168V330.607l-135.071-.049a19.164 19.164 0 0 1-16.832-28.32L241.06 10.013a19.167 19.167 0 0 1 36.005 9.154v162.534h135.902a19.167 19.167 0 0 1 16.815 28.363L270.078 502.03a19.173 19.173 0 0 1-16.812 9.97z\" fill=\"white\"></path>\n</svg>";
    function init() {
      Lampa.SettingsApi.addComponent({
        component: component,
        icon: icon,
        name: Lampa.Lang.translate('Shots')
      });
      Lampa.SettingsApi.addParam({
        component: component,
        param: {
          name: 'shots_in_player',
          type: 'trigger',
          "default": true
        },
        field: {
          name: Lampa.Lang.translate('shots_settings_in_player')
        }
      });
      Lampa.SettingsApi.addParam({
        component: component,
        param: {
          name: 'shots_in_card',
          type: 'trigger',
          "default": true
        },
        field: {
          name: Lampa.Lang.translate('shots_settings_in_card')
        }
      });
    }
    var Settings = {
      init: init
    };

    function startPlugin() {
      window.plugin_shots_ready = true;
      function init() {
        Lang.init();
        Templates.init();
        Player.init();
        Handler.init();
        Settings.init();
        Favorite.init();
        Created.init();
        View.init();
        Tags.load();
        $('body').append("\n            <style>\n            @-webkit-keyframes shots-recorder-blink{0%,50%,100%{opacity:1}25%,75%{opacity:.2}}@keyframes shots-recorder-blink{0%,50%,100%{opacity:1}25%,75%{opacity:.2}}@-webkit-keyframes shots-progress-waiting{0%{width:0;left:0}50%{width:50%;left:25%}100%{width:0;left:100%}}@keyframes shots-progress-waiting{0%{width:0;left:0}50%{width:50%;left:25%}100%{width:0;left:100%}}@-webkit-keyframes shots-placeholder-shimmer{0%{background-position:-150% 0}100%{background-position:150% 0}}@keyframes shots-placeholder-shimmer{0%{background-position:-150% 0}100%{background-position:150% 0}}@-webkit-keyframes shots-animate-down{0%{-webkit-transform:translateY(-50%);transform:translateY(-50%)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes shots-animate-down{0%{-webkit-transform:translateY(-50%);transform:translateY(-50%)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes shots-animate-up{0%{-webkit-transform:translateY(50%);transform:translateY(50%)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes shots-animate-up{0%{-webkit-transform:translateY(50%);transform:translateY(50%)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes shots-push-button{0%{-webkit-transform:scale(1);transform:scale(1)}25%{-webkit-transform:scale(1.35);transform:scale(1.35)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes shots-push-button{0%{-webkit-transform:scale(1);transform:scale(1)}25%{-webkit-transform:scale(1.35);transform:scale(1.35)}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes shots-slides-slide-up{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}100%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes shots-slides-slide-up{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}100%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@-webkit-keyframes shots-slides-slide-out{0%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}100%{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes shots-slides-slide-out{0%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}100%{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}.shots-player-recorder{position:fixed;left:0;top:0;width:100%;height:100%;z-index:50}.shots-player-recorder__body{position:fixed;left:0;right:0;bottom:1.5em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.shots-player-recorder__plate{background-color:rgba(0,0,0,0.6);-webkit-border-radius:3em;border-radius:3em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.shots-player-recorder__text{padding:0 1.2em;line-height:1.4}.shots-player-recorder__button{padding:.9em;width:3em;height:3em;-webkit-border-radius:100%;border-radius:100%;position:relative;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.shots-player-recorder__button.animate-trigger-enter{-webkit-animation:animation-trigger-enter .2s forwards;animation:animation-trigger-enter .2s forwards}.shots-player-recorder__button>svg{width:1.2em;height:1.2em}.shots-player-recorder__button>div{position:absolute;bottom:100%;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);margin-bottom:1em;text-wrap:nowrap;display:none;text-shadow:0 0 .2em rgba(0,0,0,0.5);color:#fff}.shots-player-recorder__button.focus{background:#fff;color:#000}.shots-player-recorder__button.focus>div{display:block}.shots-preview{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.shots-preview__left{width:45%;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.shots-preview__screenshot{-webkit-border-radius:1em;border-radius:1em;padding-bottom:64%;position:relative;background:#222;overflow:hidden}.shots-preview__screenshot>img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;opacity:0}.shots-preview__body{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;padding-left:2em;line-height:1.4}.shots-preview__year{font-size:.8em;margin-bottom:.5em}.shots-preview__title{font-size:1.3em;margin-bottom:.5em;overflow:hidden;-o-text-overflow:'.';text-overflow:'.';display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical}.shots-selector{padding:1.3em;-webkit-border-radius:.7em;border-radius:.7em;font-size:1.1em}.shots-selector:not(.shots-selector--transparent){background:rgba(255,255,255,0.1)}.shots-selector.focus{background:#fff;color:#000}.shots-checkbox{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.shots-checkbox__icon{width:1.3em;height:1.3em;margin-right:1em;border:.1em solid #fff;-webkit-border-radius:.3em;border-radius:.3em;position:relative}.shots-checkbox--checked .shots-checkbox__icon::after{content:'';position:absolute;left:.2em;top:.2em;right:.2em;bottom:.2em;background:#fff;-webkit-border-radius:.2em;border-radius:.2em}.shots-checkbox.focus .shots-checkbox__icon{border-color:#000}.shots-checkbox.focus .shots-checkbox__icon::after{background:#000}.shots-button{text-align:center}.shots-button+.shots-button{margin-top:.2em}.shots-modal-footer{padding-top:1em}.shots-view-button__title{position:relative}.shots-view-button__count{position:absolute;top:1.9em;left:12em;background:rgba(255,255,255,0.4);color:#fff;font-size:.7em;padding:.1em .4em;-webkit-border-radius:1.1em;border-radius:1.1em;text-align:center;min-width:2em;display:block;font-weight:700}.selectbox-item.focus .shots-view-button__count{background:rgba(0,0,0,0.4);color:#fff}.shots-modal-upload__body{margin-top:1.5em}.shots-modal-upload__body>*+*{margin-top:.2em}.shots-modal-upload__video{-webkit-border-radius:1em;border-radius:1em;overflow:hidden;margin-top:1.5em;background:#000}.shots-modal-upload__video video{background:#000;width:100%;display:block;aspect-ratio:16/9;-o-object-fit:contain;object-fit:contain}.shots-tags{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;margin:-0.25em}.shots-tags>div{padding:.3em .6em;-webkit-border-radius:.5em;border-radius:.5em;background:rgba(0,0,0,0.2);margin:.25em}.shots-tags>div>svg{width:1em !important;height:1em !important;margin-right:.6em;vertical-align:bottom}.shots-progress__text{font-size:.8em;margin-bottom:.8em}.shots-progress__bar{background:rgba(255,255,255,0.17);position:relative;-webkit-border-radius:1em;border-radius:1em;height:.4em;overflow:hidden}.shots-progress__bar>div{height:.4em;-webkit-border-radius:1em;border-radius:1em;background:#fff;position:absolute;left:0;top:0}.shots-progress.focus{background:rgba(255,255,255,0.1);color:#fff}.shots-progress.state--waiting .shots-progress__bar>div{width:10%;-webkit-animation:shots-progress-waiting 1s infinite;animation:shots-progress-waiting 1s infinite}.shots-lenta{position:absolute;left:0;top:0;width:100%;height:100%;z-index:50;background:#000}.shots-lenta--hide-panel .shots-lenta__panel{opacity:0;pointer-events:none;-webkit-transform:translate3d(0,2em,0);transform:translate3d(0,2em,0)}.shots-lenta--hide-panel .shots-lenta-video__progress-bar{opacity:.2;pointer-events:none}.shots-lenta__video{position:absolute;left:0;top:0;width:100%;height:100%;background:#000}.shots-lenta__panel{position:absolute;bottom:0;left:0;right:0;padding:1em;padding-bottom:2em;background:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,0)),to(rgba(0,0,0,0.54)));background:-webkit-linear-gradient(top,rgba(0,0,0,0) 0,rgba(0,0,0,0.54) 100%);background:-o-linear-gradient(top,rgba(0,0,0,0) 0,rgba(0,0,0,0.54) 100%);background:linear-gradient(to bottom,rgba(0,0,0,0) 0,rgba(0,0,0,0.54) 100%);-webkit-transition:opacity .3s ease,-webkit-transform .3s ease;transition:opacity .3s ease,-webkit-transform .3s ease;-o-transition:transform .3s ease,opacity .3s ease;transition:transform .3s ease,opacity .3s ease;transition:transform .3s ease,opacity .3s ease,-webkit-transform .3s ease}.shots-lenta .head-backward__button{top:1em}.shots-lenta-video__video-element{position:absolute;left:0;top:0;width:100%;height:100%;-o-object-fit:contain;object-fit:contain;background:#000}.shots-lenta-video__progress-bar{position:absolute;z-index:1;left:1em;right:1em;bottom:1em;background:rgba(255,255,255,0.3);-webkit-border-radius:1em;border-radius:1em;-webkit-transition:opacity .3s ease,-webkit-transform .3s ease;transition:opacity .3s ease,-webkit-transform .3s ease;-o-transition:transform .3s ease,opacity .3s ease;transition:transform .3s ease,opacity .3s ease;transition:transform .3s ease,opacity .3s ease,-webkit-transform .3s ease}.shots-lenta-video__progress-bar>div{height:.3em;-webkit-border-radius:1em;border-radius:1em;background:#fff;-webkit-transition:width .3s linear;-o-transition:width .3s linear;transition:width .3s linear}.shots-lenta-video__loader.show{display:block}.shots-lenta-video__layer{position:absolute;left:0;top:0;width:100%;height:100%}.shots-lenta-panel{position:relative}.shots-lenta-panel .explorer-card__head-body{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}@media screen and (max-width:400px){.shots-lenta-panel .explorer-card__head-left{font-size:.8em}}.shots-lenta-panel__card{width:50%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;align-items:flex-end;margin-bottom:0}@media screen and (max-width:580px){.shots-lenta-panel__card{width:80%}}.shots-lenta-panel__card-title{font-size:1.8em;margin-top:.3em;line-height:1.4;text-shadow:0 0 .2em rgba(0,0,0,0.5);overflow:hidden;-o-text-overflow:'.';text-overflow:'.';display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical}.shots-lenta-panel__card-year{font-size:1em;display:inline-block}.shots-lenta-panel__card-img{background:rgba(255,255,255,0.1);-webkit-border-radius:.3em;border-radius:.3em}.shots-lenta-panel__card-img img{opacity:0}.shots-lenta-panel__card-img.loaded{background:transparent}.shots-lenta-panel__card-img.loaded img{opacity:1}.shots-lenta-panel__card-img.focus:after{z-index:1;right:0;left:0;bottom:0;top:0;-webkit-border-radius:.3em;border-radius:.3em}.shots-lenta-panel__card.loading .shots-lenta-panel__card-title,.shots-lenta-panel__card.loading .shots-lenta-panel__card-year,.shots-lenta-panel__card.loading .shots-lenta-panel__card-img{background:rgba(255,255,255,0.1);-webkit-border-radius:.3em;border-radius:.3em;color:transparent;background-image:-webkit-gradient(linear,left top,right top,from(rgba(255,255,255,0)),color-stop(50%,rgba(255,255,255,0.25)),to(rgba(255,255,255,0)));background-image:-webkit-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,0.25) 50%,rgba(255,255,255,0) 100%);background-image:-o-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,0.25) 50%,rgba(255,255,255,0) 100%);background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,0.25) 50%,rgba(255,255,255,0) 100%);background-size:300% 100%;background-repeat:no-repeat;-webkit-animation:shots-placeholder-shimmer 1.5s ease-in-out infinite;animation:shots-placeholder-shimmer 1.5s ease-in-out infinite}.shots-lenta-panel__card.loading .shots-lenta-panel__card-img img{opacity:0}.shots-lenta-panel__tags{margin-top:1em}.shots-lenta-panel__counters{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.shots-lenta-panel__recorder{line-height:1.6}.shots-lenta-panel__author{display:inline-block}@media screen and (max-width:580px){.shots-lenta-panel__author{margin-bottom:1em}.shots-lenta-panel__author .shots-author__name{display:none}}.shots-lenta-panel__right{position:absolute;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding-left:2em}@media screen and (max-width:580px){.shots-lenta-panel__right{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}}@media screen and (max-width:400px){.shots-lenta-panel__right{font-size:1.1em}}.shots-lenta-panel__buttons{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.shots-lenta-panel__buttons>div{width:3em;height:3em;-webkit-border-radius:100%;border-radius:100%;background:rgba(0,0,0,0.2);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin-left:.5em}.shots-lenta-panel__buttons>div>svg{width:1.5em !important;height:1.5em !important}.shots-lenta-panel__buttons>div.focus{background:#fff;color:#000}.shots-lenta-panel__buttons>div.focus.active.action-liked{color:#ea4e4e}.shots-lenta-panel__buttons>div.focus.active.action-favorite{color:#ffc34b}.shots-lenta-panel__buttons>div:not(.active) .icon-fill{fill:transparent}.shots-lenta-panel__buttons>div.active svg{-webkit-animation:shots-push-button .2s ease forwards;animation:shots-push-button .2s ease forwards}@media screen and (max-width:580px){.shots-lenta-panel__buttons{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.shots-lenta-panel__buttons>div{margin-left:0;margin-top:1em}}.shots-counter div{font-size:1.6em;margin-top:.3em}.shots-author{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.shots-author__img{width:3em;height:3em;-webkit-border-radius:100%;border-radius:100%;background:rgba(255,255,255,0.1);overflow:hidden;position:relative}.shots-author__img img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;opacity:0}.shots-author__img.loaded{background:transparent}.shots-author__img.loaded img{opacity:1}.shots-author__name{font-size:1.3em;padding-left:1em;padding-right:1em}.shots-author.focus{background:#fff;-webkit-border-radius:3em;border-radius:3em;color:#000}.shots-author.focus .shots-author__img{-webkit-transform:scale(0.8);-ms-transform:scale(0.8);transform:scale(0.8)}.shots-status{background:rgba(0,0,0,0.5);padding:.3em .8em;-webkit-border-radius:1em;border-radius:.6em;display:inline-block;font-size:.9em;line-height:1.4;padding-top:0}.shots-status--ready{background:#8ab75b}.shots-status--error{background:#d9534f}.shots-status--processing{background:#f0ad4e}.shots-status--blocked{background:#5b7c9c}.shots-status--deleted{background:#d04545}.full-episode--shot .shots-tags>div{background:rgba(0,0,0,0.5)}.full-episode--shot .full-episode__body{background:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,0.5)),color-stop(40%,rgba(0,0,0,0)));background:-webkit-linear-gradient(bottom,rgba(0,0,0,0.5) 0,rgba(0,0,0,0) 40%);background:-o-linear-gradient(bottom,rgba(0,0,0,0.5) 0,rgba(0,0,0,0) 40%);background:linear-gradient(0,rgba(0,0,0,0.5) 0,rgba(0,0,0,0) 40%)}.full-episode--shot .full-episode__date{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.full-episode--shot .full-episode__liked{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.full-episode--shot .full-episode__liked svg{width:1em !important;height:1em !important;margin-right:.3em}.full-episode--shot .full-episode__shot-icon{position:absolute;top:1em;left:1em}.full-episode--shot .full-episode__shot-icon svg{width:2em !important;height:2em !important}.full-episode--shot .shots-status{margin-top:.7em}.shots-player--recording .player-panel,.shots-player--recording .player-info,.shots-player--recording .player-footer{display:none}.shots-player-card{padding:0;width:16em}.shots-player-card .card__view{margin-bottom:0}.shots-player-segments{position:relative;z-index:1}.shots-player-segments__time{position:absolute;top:0;background:#b995ff;height:100%;height:.4em;pointer-events:none}.shots-player-segments__picture{position:absolute;bottom:1em;display:none;cursor:pointer}.shots-player-segments__picture img{width:7em;height:4em;-o-object-fit:cover;object-fit:cover;opacity:0;-webkit-transition:opacity .3s ease;-o-transition:opacity .3s ease;transition:opacity .3s ease;-webkit-border-radius:.3em;border-radius:.3em}.shots-player-segments__picture--loaded img{opacity:1}.shots-player-segments.focus .shots-player-segments__picture{display:block}.shots-video-present{position:fixed;left:0;top:0;width:100%;height:100%;background:#000;z-index:50}.shots-video-present video{position:fixed;left:0;top:0;width:100%;height:100%;-o-object-fit:contain;object-fit:contain}.shots-video-present .head-backward{position:absolute;top:.65em}.shots-svg-auto{height:auto !important}.shots-svg-auto--helmet{max-height:6em}.shots-selector-tags{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-border-radius:.7em;border-radius:.7em;background:rgba(255,255,255,0.1);padding:.2em}.shots-selector-tags__tag{display:inline-block;background:rgba(0,0,0,0.2);padding:0 1em;-webkit-border-radius:.6em;border-radius:.6em;margin:.2em;position:relative}.shots-selector-tags__tag span{font-size:1.1em;display:inline-block;padding:.6em 0}.shots-selector-tags__tag svg{width:1.2em !important;height:1.2em !important;margin-right:1em}.shots-selector-tags__tag.active::after{content:'';display:block;position:absolute;right:.4em;top:50%;height:.5em;width:.5em;-webkit-border-radius:1em;border-radius:1em;background:#ffb509;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%)}.shots-selector-tags__tag.active span{-webkit-transform:translateX(-0.3em);-ms-transform:translateX(-0.3em);transform:translateX(-0.3em)}.shots-selector-tags__tag.focus{background:#fff;color:#000}.shots-selector-tags__tag.focus::after{background:#000}.shots-line-title{font-size:1.1em;margin-bottom:.7em}.shots-slides{position:absolute;top:0;left:0;width:100%;height:100%;z-index:50}.shots-slides .head-backward{position:absolute;top:.65em}.shots-slides__slide{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);-o-object-fit:contain;object-fit:contain;background:#08090d}.shots-slides__slide.active{-webkit-animation:shots-slides-slide-up .5s forwards;animation:shots-slides-slide-up .5s forwards}.shots-slides__slide.up{-webkit-animation:shots-slides-slide-out .5s forwards;animation:shots-slides-slide-out .5s forwards}.shots-slides__down{position:absolute;left:50%;bottom:2em;background:rgba(255,255,255,0.3);padding:.7em 1.3em;-webkit-border-radius:3em;border-radius:3em;-webkit-transform:translate3d(-50%,1em,0);transform:translate3d(-50%,1em,0);opacity:0;-webkit-transition:opacity .5s,-webkit-transform .5s;transition:opacity .5s,-webkit-transform .5s;-o-transition:opacity .5s,transform .5s;transition:opacity .5s,transform .5s;transition:opacity .5s,transform .5s,-webkit-transform .5s}.shots-slides__down.active{opacity:1;-webkit-transform:translate3d(-50%,0,0);transform:translate3d(-50%,0,0)}.shots-slides__install{position:absolute;left:50%;bottom:2em;background:#fff;color:#000;padding:.7em 1.3em;-webkit-border-radius:3em;border-radius:3em;-webkit-transform:translate3d(-50%,3em,0);transform:translate3d(-50%,3em,0);opacity:0;-webkit-transition:opacity .5s,-webkit-transform .5s;transition:opacity .5s,-webkit-transform .5s;-o-transition:opacity .5s,transform .5s;transition:opacity .5s,transform .5s;transition:opacity .5s,transform .5s,-webkit-transform .5s;font-size:1.7em}.shots-slides__install.active{opacity:1;-webkit-transform:translate3d(-50%,0,0);transform:translate3d(-50%,0,0)}.shots-player-button.focus .rec{fill:#ff0101}body.true--mobile .shots-lenta__panel,body.true--mobile .shots-player-recorder__body{bottom:4em}body.true--mobile .shots-lenta-video__progress-bar{bottom:3em}\n            </style>\n        ");

        // Добавляем компоненты

        Lampa.Component.add('shots_list', component$3);
        Lampa.Component.add('shots_card', component$2);
        Lampa.Component.add('shots_channel', component$1);

        // Экран закладок - шоты

        Lampa.ContentRows.add({
          index: 1,
          screen: ['bookmarks'],
          call: function call(params, screen) {
            var favotite = Favorite.get();
            var created = Created.get();
            var lines = [];
            var onmore = {
              emit: {
                onMore: function onMore() {
                  Lampa.Activity.push({
                    url: this.data.type,
                    title: this.data.title,
                    component: 'shots_list',
                    page: 2
                  });
                }
              }
            };
            Lampa.Utils.extendItemsParams(favotite, {
              createInstance: function createInstance(item_data) {
                return Shot(item_data, {
                  playlist: favotite,
                  onNext: function onNext(page, call) {
                    Favorite.page(page, call);
                  }
                });
              }
            });
            Lampa.Utils.extendItemsParams(created, {
              createInstance: function createInstance(item_data) {
                return Shot(item_data, {
                  playlist: created,
                  onNext: function onNext(page, call) {
                    Created.page(page, call);
                  }
                });
              }
            });
            if (favotite.length) {
              lines.push({
                title: Lampa.Lang.translate('shots_title_favorite'),
                results: favotite,
                type: 'favorite',
                total_pages: favotite.length >= 20 ? 2 : 1,
                params: onmore
              });
            }
            if (created.length) {
              lines.push({
                title: Lampa.Lang.translate('shots_title_created'),
                results: created,
                type: 'created',
                total_pages: created.length >= 20 ? 2 : 1,
                params: onmore
              });
            }
            if (lines.length) return lines;
          }
        });

        // Главный экран - шоты

        Lampa.ContentRows.add({
          name: 'shots_main',
          title: 'Shots',
          index: 2,
          screen: ['main'],
          call: function call(params, screen) {
            if (Lampa.Account.Permit.child) return;
            return function (call) {
              Api.lenta({
                sort: 'new'
              }, function (shots) {
                Lampa.Utils.extendItemsParams(shots, {
                  createInstance: function createInstance(item_data) {
                    return Shot(item_data, {
                      playlist: shots,
                      onNext: function onNext(page, call) {
                        Api.lenta({
                          sort: 'new',
                          page: page
                        }, call);
                      }
                    });
                  }
                });
                call({
                  title: 'Shots',
                  results: shots,
                  type: 'favorite',
                  total_pages: 1,
                  icon_svg: '<svg><use xlink:href="#sprite-shots"></use></svg>',
                  icon_bgcolor: '#fff',
                  icon_color: '#fd4518',
                  params: {
                    module: Lampa.Maker.module('Line').toggle(Lampa.Maker.module('Line').MASK.base, 'Icon')
                  }
                });
              });
            };
          }
        });

        // Кнопка в меню

        var waiting = false;
        Lampa.Menu.addButton('<svg><use xlink:href="#sprite-shots"></use></svg>', 'Shots', function () {
          var present = new Present();
          present.onComplete = function () {
            present.onBack = function () {};
            if (waiting) return;
            var items = [{
              title: Lampa.Lang.translate('shots_watch_roll'),
              onSelect: function onSelect() {
                Lampa.Controller.toggle('content');
                waiting = true;
                var call = function call(shots) {
                  Lampa.Loading.stop();
                  present.destroy();
                  waiting = false;
                  if (shots.length == 0) {
                    return Lampa.Bell.push({
                      icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
                      text: Lampa.Lang.translate('shots_alert_noshots')
                    });
                  }
                  var lenta = new Lenta(shots[0], shots);
                  lenta.onNext = function (page, call) {
                    Roll.next(call);
                  };
                  lenta.start();
                };
                Lampa.Loading.start(function () {
                  waiting = false;
                  present.destroy();
                  call = function call() {};
                  Lampa.Loading.stop();
                });
                Roll.start(call);
              }
            }, {
              title: Lampa.Lang.translate('shots_choose_tags_select'),
              separator: true
            }];
            Tags.list().forEach(function (tag) {
              items.push({
                title: tag.title,
                tag: tag,
                checkbox: true
              });
            });
            items.push({
              title: Lampa.Lang.translate('shots_watch_tags'),
              onSelect: function onSelect() {
                Lampa.Controller.toggle('content');
                var selected_tags = items.filter(function (a) {
                  return a.checked && a.tag;
                }).map(function (a) {
                  return a.tag;
                });
                var tags_slug = selected_tags.map(function (t) {
                  return t.slug;
                }).join(',');
                if (selected_tags.length == 0) return Lampa.Bell.push({
                  icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
                  text: Lampa.Lang.translate('shots_alert_no_tags')
                });
                Api.lenta({
                  tags: tags_slug
                }, function (shots) {
                  if (shots.length == 0) {
                    return Lampa.Bell.push({
                      icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
                      text: Lampa.Lang.translate('shots_alert_noshots')
                    });
                  }
                  var lenta = new Lenta(shots[0], shots);
                  lenta.onNext = function (page, call) {
                    Api.lenta({
                      tags: tags_slug,
                      page: page
                    }, call);
                  };
                  lenta.start();
                });
              }
            });
            Lampa.Select.show({
              title: Lampa.Lang.translate('Shots'),
              items: items,
              onBack: function onBack() {
                Lampa.Controller.toggle('content');
              }
            });
          };
          present.onBack = function () {
            present.destroy();
            Lampa.Controller.toggle('content');
          };
          present.start();
        });
      }
      if (Lampa.Manifest.app_digital >= 307) {
        if (window.appready) init();else {
          Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') init();
          });
        }
      }
    }
    if (!window.plugin_shots_ready && Lampa.Lang.selected(['ru', 'uk', 'be'])) startPlugin();

})();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvdHMuanMiLCJzb3VyY2VzIjpbInNob3RzL3V0aWxzL2xhbmcuanMiLCJzaG90cy91dGlscy90ZW1wbGF0ZXMuanMiLCJzaG90cy91dGlscy91dGlscy5qcyIsInNob3RzL2RlZmluZWQuanMiLCJzaG90cy91dGlscy9tZXRyaWMuanMiLCJzaG90cy9jb21wb25lbnRzL3JlY29yZGVyLmpzIiwic2hvdHMvY29tcG9uZW50cy90YWdzLmpzIiwic2hvdHMvY29tcG9uZW50cy9wcmV2aWV3LmpzIiwic2hvdHMvY29tcG9uZW50cy9jaGVja2JveC5qcyIsInNob3RzL3V0aWxzL2FwaS5qcyIsInNob3RzL2NvbXBvbmVudHMvcHJvZ3Jlc3MuanMiLCJzaG90cy91dGlscy9oYW5kbGVyLmpzIiwic2hvdHMvdXRpbHMvY3JlYXRlZC5qcyIsInNob3RzL2NvbXBvbmVudHMvc2VsZWN0b3IuanMiLCJzaG90cy91dGlscy90YWdzLmpzIiwic2hvdHMvY29tcG9uZW50cy91cGxvYWQuanMiLCJzaG90cy91dGlscy92aWV3LmpzIiwic2hvdHMvdXRpbHMvcGxheWVyLmpzIiwic2hvdHMvdXRpbHMvZmF2b3JpdGUuanMiLCJzaG90cy91dGlscy9yb2xsLmpzIiwic2hvdHMvbGVudGEvdmlkZW8uanMiLCJzaG90cy9jb21wb25lbnRzL2F1dGhvci5qcyIsInNob3RzL3V0aWxzL2xpa2VzLmpzIiwic2hvdHMvdXRpbHMvbW9kYWxzLmpzIiwic2hvdHMvY29tcG9uZW50cy9zbGlkZXMuanMiLCJzaG90cy9sZW50YS9wYW5lbC5qcyIsInNob3RzL2xlbnRhL2xlbnRhLmpzIiwic2hvdHMvY29tcG9uZW50cy9zaG90LmpzIiwic2hvdHMvY29tcG9uZW50cy9saXN0LmpzIiwic2hvdHMvY29tcG9uZW50cy9jYXJkLmpzIiwic2hvdHMvY29tcG9uZW50cy9jaGFubmVsLmpzIiwic2hvdHMvY29tcG9uZW50cy9wcmVzZW50LmpzIiwic2hvdHMvdXRpbHMvc2V0dGluZ3MuanMiLCJzaG90cy9zaG90cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBpbml0KCl7XG4gICAgTGFtcGEuTGFuZy5hZGQoe1xuICAgICAgICBlbXB0eToge1xuICAgICAgICAgICAgcnU6ICcnLFxuICAgICAgICAgICAgZW46ICcnLFxuICAgICAgICAgICAgdWs6ICcnLFxuICAgICAgICAgICAgYmU6ICcnLFxuICAgICAgICAgICAgemg6ICcnLFxuICAgICAgICAgICAgcHQ6ICcnLFxuICAgICAgICAgICAgYmc6ICcnLFxuICAgICAgICAgICAgcm86ICcnLFxuICAgICAgICB9LFxuICAgIH0pXG5cbiAgICBMYW1wYS5MYW5nLmFkZCh7XG4gICAgICAgIHNob3RzX21vZGFsX2JlZm9yZV9yZWNvcmRpbmdfdHh0XzE6IHtcbiAgICAgICAgICAgIHJ1OiAn0KHQvtGF0YDQsNC90Y/QudGC0LUg0YHQstC+0Lgg0LvRjtCx0LjQvNGL0LUg0LzQvtC80LXQvdGC0Ysg0Lgg0LTQtdC70LjRgtC10YHRjCDQuNC80Lgg0YEg0LTRgNGD0LPQuNC80LghJyxcbiAgICAgICAgICAgIGVuOiAnU2F2ZSB5b3VyIGZhdm9yaXRlIG1vbWVudHMgYW5kIHNoYXJlIHRoZW0gd2l0aCBvdGhlcnMhJyxcbiAgICAgICAgICAgIHVrOiAn0JfQsdC10YDRltCz0LDQudGC0LUg0YHQstC+0Zcg0YPQu9GO0LHQu9C10L3RliDQvNC+0LzQtdC90YLQuCDRgtCwINC00ZbQu9GW0YLRjNGB0Y8g0L3QuNC80Lgg0Lcg0ZbQvdGI0LjQvNC4IScsXG4gICAgICAgICAgICBiZTogJ9CX0LDRhdC+0Z7QstCw0LnRhtC1INGB0LLQsNC1INC70Y7QsdGW0LzRi9GPINC80L7QvNCw0L3RgtGLINGWINC00LfRj9C70ZbRhtC10YHRjyDRltC80ZYg0Lcg0ZbQvdGI0YvQvNGWIScsXG4gICAgICAgICAgICB6aDogJ+S/neWtmOaCqOWWnOeIseeahOaXtuWIu+W5tuS4juS7luS6uuWIhuS6q++8gScsXG4gICAgICAgICAgICBwdDogJ1NhbHZlIHNldXMgbW9tZW50b3MgZmF2b3JpdG9zIGUgY29tcGFydGlsaGUtb3MgY29tIG91dHJhcyBwZXNzb2FzIScsXG4gICAgICAgICAgICBiZzogJ9CX0LDQv9Cw0LfQstCw0LnRgtC1INC70Y7QsdC40LzQuNGC0LUg0YHQuCDQvNC+0LzQtdC90YLQuCDQuCDQs9C4INGB0L/QvtC00LXQu9GP0LnRgtC1INGBINC00YDRg9Cz0LghJyxcbiAgICAgICAgICAgIHJvOiAnU2FsdmVhesSDLcibaSBtb21lbnRlbGUgcHJlZmVyYXRlIMiZaSDDrm1wxINydMSDyJllyJl0ZS1sZSBjdSBjZWlsYWzIm2khJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c19tb2RhbF9iZWZvcmVfcmVjb3JkaW5nX3R4dF8yOiB7XG4gICAgICAgICAgICBydTogJ9CS0YvQsdC10YDQuNGC0LUg0LjQvdGC0LXRgNC10YHRg9GO0YnQuNC5INC80L7QvNC10L3RgiDQsiDQstC40LTQtdC+INC4INC90LDQttC80LjRgtC1INC60L3QvtC/0LrRgyBcItCd0LDRh9Cw0YLRjCDQt9Cw0L/QuNGB0YxcIi4nLFxuICAgICAgICAgICAgZW46ICdDaG9vc2UgdGhlIG1vbWVudCBvZiBpbnRlcmVzdCBpbiB0aGUgdmlkZW8gYW5kIHByZXNzIHRoZSBcIlN0YXJ0IFJlY29yZGluZ1wiIGJ1dHRvbi4nLFxuICAgICAgICAgICAgdWs6ICfQktC40LHQtdGA0ZbRgtGMINGG0ZbQutCw0LLQuNC5INC80L7QvNC10L3RgiDRgyDQstGW0LTQtdC+INGC0LAg0L3QsNGC0LjRgdC90ZbRgtGMINC60L3QvtC/0LrRgyBcItCf0L7Rh9Cw0YLQuCDQt9Cw0L/QuNGBXCIuJyxcbiAgICAgICAgICAgIGJlOiAn0JLRi9Cx0LXRgNGL0YbQtSDRhtGW0LrQsNCy0Ysg0LzQvtC80LDQvdGCINGDINCy0ZbQtNGN0LAg0ZYg0L3QsNGG0ZbRgdC90ZbRhtC1INC60L3QvtC/0LrRgyBcItCf0LDRh9Cw0YbRjCDQt9Cw0L/RltGBXCIuJyxcbiAgICAgICAgICAgIHpoOiAn6YCJ5oup6KeG6aKR5Lit55qE5oSf5YW06Laj5pe25Yi777yM54S25ZCO5oyJ4oCc5byA5aeL5b2V5Yi24oCd5oyJ6ZKu44CCJyxcbiAgICAgICAgICAgIHB0OiAnRXNjb2xoYSBvIG1vbWVudG8gZGUgaW50ZXJlc3NlIG5vIHbDrWRlbyBlIHByZXNzaW9uZSBvIGJvdMOjbyBcIkluaWNpYXIgR3JhdmHDp8Ojb1wiLicsXG4gICAgICAgICAgICBiZzogJ9CY0LfQsdC10YDQtdGC0LUg0LjQvdGC0LXRgNC10YHQvdC40Y8g0LzQvtC80LXQvdGCINCy0YrQsiDQstC40LTQtdC+0YLQviDQuCDQvdCw0YLQuNGB0L3QtdGC0LUg0LHRg9GC0L7QvdCwIFwi0JfQsNC/0L7Rh9C90Lgg0LfQsNC/0LjRgVwiLicsXG4gICAgICAgICAgICBybzogJ0FsZWdlyJtpIG1vbWVudHVsIGRlIGludGVyZXMgZGluIHZpZGVvY2xpcCDImWkgYXDEg3NhyJtpIGJ1dG9udWwgXCLDjm5jZXBlyJtpIMOubnJlZ2lzdHJhcmVhXCIuJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c19zdGVwOiB7XG4gICAgICAgICAgICBydTogJ9Co0LDQsycsXG4gICAgICAgICAgICBlbjogJ1N0ZXAnLFxuICAgICAgICAgICAgdWs6ICfQmtGA0L7QuicsXG4gICAgICAgICAgICBiZTogJ9Ca0YDQvtC6JyxcbiAgICAgICAgICAgIHpoOiAn5q2l6aqkJyxcbiAgICAgICAgICAgIHB0OiAnUGFzc28nLFxuICAgICAgICAgICAgYmc6ICfQodGC0YrQv9C60LAnLFxuICAgICAgICAgICAgcm86ICdQYXMnXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX3N0YXJ0X3JlY29yZGluZzoge1xuICAgICAgICAgICAgcnU6ICfQndCw0YfQsNGC0Ywg0LfQsNC/0LjRgdGMJyxcbiAgICAgICAgICAgIGVuOiAnU3RhcnQgcmVjb3JkaW5nJyxcbiAgICAgICAgICAgIHVrOiAn0J/QvtGH0LDRgtC4INC30LDQv9C40YEnLFxuICAgICAgICAgICAgYmU6ICfQn9Cw0YfQsNGG0Ywg0LfQsNC/0ZbRgScsXG4gICAgICAgICAgICB6aDogJ+W8gOWni+W9leWIticsXG4gICAgICAgICAgICBwdDogJ0luaWNpYXIgZ3JhdmHDp8OjbycsXG4gICAgICAgICAgICBiZzogJ9CX0LDQv9C+0YfQvdC4INC30LDQv9C40YEnLFxuICAgICAgICAgICAgcm86ICfDjm5jZXBlIMOubnJlZ2lzdHJhcmVhJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c19jaG9pY2Vfc3RhcnRfcG9pbnQ6IHtcbiAgICAgICAgICAgIHJ1OiAn0JLRi9Cx0YDQsNGC0Ywg0L/QvtC30LjRhtC40Y4nLFxuICAgICAgICAgICAgZW46ICdDaG9vc2UgcG9zaXRpb24nLFxuICAgICAgICAgICAgdWs6ICfQktC40LHRgNCw0YLQuCDQv9C+0LfQuNGG0ZbRjicsXG4gICAgICAgICAgICBiZTogJ9CS0YvQsdGA0LDRhtGMINC/0LDQt9GW0YbRi9GOJyxcbiAgICAgICAgICAgIHpoOiAn6YCJ5oup5L2N572uJyxcbiAgICAgICAgICAgIHB0OiAnRXNjb2xoZXIgcG9zacOnw6NvJyxcbiAgICAgICAgICAgIGJnOiAn0JjQt9Cx0LXRgNC10YLQtSDQv9C+0LfQuNGG0LjRjycsXG4gICAgICAgICAgICBybzogJ0FsZWdlyJtpIHBvemnIm2lhJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c19tb2RhbF9idXR0b25fdXBsb2FkX3N0YXJ0OiB7XG4gICAgICAgICAgICBydTogJ9CX0LDQs9GA0YPQt9C40YLRjCDQuCDRgdC+0YXRgNCw0L3QuNGC0Ywg0LfQsNC/0LjRgdGMJyxcbiAgICAgICAgICAgIGVuOiAnVXBsb2FkIGFuZCBzYXZlIHJlY29yZGluZycsXG4gICAgICAgICAgICB1azogJ9CX0LDQstCw0L3RgtCw0LbQuNGC0Lgg0YLQsCDQt9Cx0LXRgNC10LPRgtC4INC30LDQv9C40YEnLFxuICAgICAgICAgICAgYmU6ICfQl9Cw0LPRgNGD0LfRltGG0Ywg0ZYg0LfQsNGF0LDQstCw0YbRjCDQt9Cw0L/RltGBJyxcbiAgICAgICAgICAgIHpoOiAn5LiK5Lyg5bm25L+d5a2Y5b2V6Z+zJyxcbiAgICAgICAgICAgIHB0OiAnQ2FycmVnYXIgZSBzYWx2YXIgZ3JhdmHDp8OjbycsXG4gICAgICAgICAgICBiZzogJ9Ca0LDRh9C4INC4INC30LDQv9Cw0LfQuCDQt9Cw0L/QuNGB0LAnLFxuICAgICAgICAgICAgcm86ICfDjm5jxINyY2HIm2kgyJlpIHNhbHZhyJtpIMOubnJlZ2lzdHJhcmVhJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c19tb2RhbF9idXR0b25fdXBsb2FkX2NhbmNlbDoge1xuICAgICAgICAgICAgcnU6ICfQntGC0LzQtdC90LjRgtGMINC4INGD0LTQsNC70LjRgtGMINC30LDQv9C40YHRjCcsXG4gICAgICAgICAgICBlbjogJ0NhbmNlbCBhbmQgZGVsZXRlIHJlY29yZGluZycsXG4gICAgICAgICAgICB1azogJ9Ch0LrQsNGB0YPQstCw0YLQuCDRgtCwINCy0LjQtNCw0LvQuNGC0Lgg0LfQsNC/0LjRgScsXG4gICAgICAgICAgICBiZTogJ9CQ0LTQvNGP0L3RltGG0Ywg0ZYg0LLQuNC00LDQu9GW0YbRjCDQt9Cw0L/RltGBJyxcbiAgICAgICAgICAgIHpoOiAn5Y+W5raI5bm25Yig6Zmk5b2V6Z+zJyxcbiAgICAgICAgICAgIHB0OiAnQ2FuY2VsYXIgZSBleGNsdWlyIGdyYXZhw6fDo28nLFxuICAgICAgICAgICAgYmc6ICfQntGC0LzQtdC90Lgg0Lgg0LjQt9GC0YDQuNC5INC30LDQv9C40YHQsCcsXG4gICAgICAgICAgICBybzogJ0FudWxlYXrEgyDImWkgyJl0ZXJnZSDDrm5yZWdpc3RyYXJlYSdcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfbW9kYWxfYnV0dG9uX3VwbG9hZF9hZ2Fpbjoge1xuICAgICAgICAgICAgcnU6ICfQndC1INGD0LTQsNC70L7RgdGMINC30LDQs9GA0YPQt9C40YLRjC4g0J/QvtC/0YDQvtCx0L7QstCw0YLRjCDRgdC90L7QstCwJyxcbiAgICAgICAgICAgIGVuOiAnRmFpbGVkIHRvIHVwbG9hZC4gVHJ5IGFnYWluJyxcbiAgICAgICAgICAgIHVrOiAn0J3QtSDQstC00LDQu9C+0YHRjyDQt9Cw0LLQsNC90YLQsNC20LjRgtC4LiDQodC/0YDQvtCx0YPQudGC0LUg0YnQtSDRgNCw0LcnLFxuICAgICAgICAgICAgYmU6ICfQndC1INGe0LTQsNC70L7RgdGPINC30LDQs9GA0YPQt9GW0YbRjC4g0J/QsNGB0L/RgNCw0LHRg9C50YbQtSDRj9GI0YfRjSDRgNCw0LcnLFxuICAgICAgICAgICAgemg6ICfkuIrkvKDlpLHotKXjgIIg5YaN6K+V5LiA5qyhJyxcbiAgICAgICAgICAgIHB0OiAnRmFsaGEgYW8gY2FycmVnYXIuIFRlbnRlIG5vdmFtZW50ZScsXG4gICAgICAgICAgICBiZzogJ9Cd0LXRg9GB0L/QtdGI0LXQvSDRitC/0LvQvtGD0LQuINCe0L/QuNGC0LDQuSDQvtGC0L3QvtCy0L4nLFxuICAgICAgICAgICAgcm86ICfDjm5jxINyY2FyZWEgYSBlyJl1YXQuIMOObmNlYXJjxIMgZGluIG5vdSdcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfbW9kYWxfYnV0dG9uX3VwbG9hZF9jb21wbGV0ZToge1xuICAgICAgICAgICAgcnU6ICfQpdC+0YDQvtGI0L4nLFxuICAgICAgICAgICAgZW46ICdEb25lJyxcbiAgICAgICAgICAgIHVrOiAn0JPQvtGC0L7QstC+JyxcbiAgICAgICAgICAgIGJlOiAn0JPQsNGC0L7QstCwJyxcbiAgICAgICAgICAgIHpoOiAn5a6M5oiQJyxcbiAgICAgICAgICAgIHB0OiAnQ29uY2x1w61kbycsXG4gICAgICAgICAgICBiZzogJ9CT0L7RgtC+0LLQvicsXG4gICAgICAgICAgICBybzogJ0ZpbmFsaXphdCdcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfbW9kYWxfc2hvcnRfcmVjb3JkaW5nX3R4dDoge1xuICAgICAgICAgICAgcnU6ICfQl9Cw0L/QuNGB0Ywg0YHQu9C40YjQutC+0Lwg0LrQvtGA0L7RgtC60LDRjy4g0JzQuNC90LjQvNCw0LvRjNC90LDRjyDQtNC70LjQvdCwINC30LDQv9C40YHQuCDQtNC+0LvQttC90LAg0LHRi9GC0Ywg0L3QtSDQvNC10L3QtdC1IDEwINGB0LXQutGD0L3QtC4nLFxuICAgICAgICAgICAgZW46ICdUaGUgcmVjb3JkaW5nIGlzIHRvbyBzaG9ydC4gVGhlIG1pbmltdW0gcmVjb3JkaW5nIGxlbmd0aCBtdXN0IGJlIGF0IGxlYXN0IDEwIHNlY29uZHMuJyxcbiAgICAgICAgICAgIHVrOiAn0JfQsNC/0LjRgSDQt9Cw0L3QsNC00YLQviDQutC+0YDQvtGC0LrQuNC5LiDQnNGW0L3RltC80LDQu9GM0L3QsCDQtNC+0LLQttC40L3QsCDQt9Cw0L/QuNGB0YMg0L/QvtCy0LjQvdC90LAg0LHRg9GC0Lgg0L3QtSDQvNC10L3RiNC1IDEwINGB0LXQutGD0L3QtC4nLFxuICAgICAgICAgICAgYmU6ICfQl9Cw0L/RltGBINC30LDQvdCw0LTRgtCwINC60LDRgNC+0YLQutGWLiDQnNGW0L3RltC80LDQu9GM0L3QsNGPINC00LDRntC20YvQvdGPINC30LDQv9GW0YHRgyDQv9Cw0LLRltC90L3QsCDQsdGL0YbRjCDQvdC1INC80LXQvdGIINC30LAgMTAg0YHQtdC60YPQvdC0LicsXG4gICAgICAgICAgICB6aDogJ+W9lemfs+aXtumXtOWkquefreOAgiDmnIDnn63lvZXpn7Pplb/luqblv4Xpobvoh7PlsJHkuLoxMOenkuOAgicsXG4gICAgICAgICAgICBwdDogJ0EgZ3JhdmHDp8OjbyDDqSBtdWl0byBjdXJ0YS4gTyBjb21wcmltZW50byBtw61uaW1vIGRhIGdyYXZhw6fDo28gZGV2ZSBzZXIgZGUgcGVsbyBtZW5vcyAxMCBzZWd1bmRvcy4nLFxuICAgICAgICAgICAgYmc6ICfQl9Cw0L/QuNGB0YrRgiDQtSDRgtCy0YrRgNC00LUg0LrRgNCw0YLRitC6LiDQnNC40L3QuNC80LDQu9C90LDRgtCwINC00YrQu9C20LjQvdCwINC90LAg0LfQsNC/0LjRgdCwINGC0YDRj9Cx0LLQsCDQtNCwINCx0YrQtNC1INC/0L7QvdC1IDEwINGB0LXQutGD0L3QtNC4LicsXG4gICAgICAgICAgICBybzogJ8OObnJlZ2lzdHJhcmVhIGVzdGUgcHJlYSBzY3VydMSDLiBMdW5naW1lYSBtaW5pbcSDIGEgw65ucmVnaXN0csSDcmlpIHRyZWJ1aWUgc8SDIGZpZSBkZSBjZWwgcHXIm2luIDEwIHNlY3VuZGUuJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c191cGxvYWRfcHJvZ3Jlc3Nfc3RhcnQ6IHtcbiAgICAgICAgICAgIHJ1OiAn0J/QvtC70YPRh9C10L3QuNC1INGB0YHRi9C70LrQuCDQtNC70Y8g0LfQsNCz0YDRg9C30LrQuC4uLicsXG4gICAgICAgICAgICBlbjogJ0dldHRpbmcgdXBsb2FkIGxpbmsuLi4nLFxuICAgICAgICAgICAgdWs6ICfQntGC0YDQuNC80LDQvdC90Y8g0L/QvtGB0LjQu9Cw0L3QvdGPINC00LvRjyDQt9Cw0LLQsNC90YLQsNC20LXQvdC90Y8uLi4nLFxuICAgICAgICAgICAgYmU6ICfQkNGC0YDRi9C80LDQvdC90LUg0YHQv9Cw0YHRi9C70LrRliDQtNC70Y8g0LfQsNCz0YDRg9C30LrRli4uLicsXG4gICAgICAgICAgICB6aDogJ+iOt+WPluS4iuS8oOmTvuaOpS4uLicsXG4gICAgICAgICAgICBwdDogJ09idGVuZG8gbGluayBkZSB1cGxvYWQuLi4nLFxuICAgICAgICAgICAgYmc6ICfQn9C+0LvRg9GH0LDQstCw0L3QtSDQvdCwINCy0YDRitC30LrQsCDQt9CwINC60LDRh9Cy0LDQvdC1Li4uJyxcbiAgICAgICAgICAgIHJvOiAnU2Ugb2LIm2luZSBsaW5rLXVsIGRlIHVwbG9hZC4uLidcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfdXBsb2FkX3Byb2dyZXNzX3VwbG9hZGluZzoge1xuICAgICAgICAgICAgcnU6ICfQl9Cw0LPRgNGD0LfQutCwINC30LDQv9C40YHQuC4uLicsXG4gICAgICAgICAgICBlbjogJ1VwbG9hZGluZyByZWNvcmRpbmcuLi4nLFxuICAgICAgICAgICAgdWs6ICfQl9Cw0LLQsNC90YLQsNC20LXQvdC90Y8g0LfQsNC/0LjRgdGDLi4uJyxcbiAgICAgICAgICAgIGJlOiAn0JfQsNCz0YDRg9C30LrQsCDQt9Cw0L/RltGB0YMuLi4nLFxuICAgICAgICAgICAgemg6ICfmraPlnKjkuIrkvKDlvZXpn7MuLi4nLFxuICAgICAgICAgICAgcHQ6ICdDYXJyZWdhbmRvIGdyYXZhw6fDo28uLi4nLFxuICAgICAgICAgICAgYmc6ICfQmtCw0YfQstCw0L3QtSDQvdCwINC30LDQv9C40YHQsC4uLicsXG4gICAgICAgICAgICBybzogJ1NlIMOubmNhcmPEgyDDrm5yZWdpc3RyYXJlYS4uLidcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfdXBsb2FkX3Byb2dyZXNzX25vdGlmeToge1xuICAgICAgICAgICAgcnU6ICfQntC/0L7QstC10YnQtdC90LjQtSDRgdC10YDQstC40YHQsC4uLicsXG4gICAgICAgICAgICBlbjogJ05vdGlmeWluZyBzZXJ2aWNlLi4uJyxcbiAgICAgICAgICAgIHVrOiAn0J/QvtCy0ZbQtNC+0LzQu9C10L3QvdGPINGB0LXRgNCy0ZbRgdGDLi4uJyxcbiAgICAgICAgICAgIGJlOiAn0JDQv9Cw0LLRj9GI0YfRjdC90L3QtSDRgdGN0YDQstGW0YHRgy4uLicsXG4gICAgICAgICAgICB6aDogJ+mAmuefpeacjeWKoS4uLicsXG4gICAgICAgICAgICBwdDogJ05vdGlmaWNhbmRvIHNlcnZpw6dvLi4uJyxcbiAgICAgICAgICAgIGJnOiAn0KPQstC10LTQvtC80Y/QstCw0L3QtSDQvdCwINGD0YHQu9GD0LPQsNGC0LAuLi4nLFxuICAgICAgICAgICAgcm86ICdTZSBub3RpZmljxIMgc2VydmljaXVsLi4uJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c191cGxvYWRfY29tcGxldGVfdGV4dDoge1xuICAgICAgICAgICAgcnU6ICfQl9Cw0L/QuNGB0Ywg0YPRgdC/0LXRiNC90L4g0LfQsNCz0YDRg9C20LXQvdCwINC4INC+0YLQv9GA0LDQstC70LXQvdCwINC90LAg0L7QsdGA0LDQsdC+0YLQutGDLiDQktGLINC/0L7Qu9GD0YfQuNGC0LUg0YPQstC10LTQvtC80LvQtdC90LjQtSwg0LrQvtCz0LTQsCDQvtC90LAg0LHRg9C00LXRgiDQs9C+0YLQvtCy0LAuJyxcbiAgICAgICAgICAgIGVuOiAnVGhlIHJlY29yZGluZyBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgdXBsb2FkZWQgYW5kIHNlbnQgZm9yIHByb2Nlc3NpbmcuIFlvdSB3aWxsIHJlY2VpdmUgYSBub3RpZmljYXRpb24gd2hlbiBpdCBpcyByZWFkeS4nLFxuICAgICAgICAgICAgdWs6ICfQl9Cw0L/QuNGBINGD0YHQv9GW0YjQvdC+INC30LDQstCw0L3RgtCw0LbQtdC90L4g0YLQsCDQvdCw0LTRltGB0LvQsNC90L4g0L3QsCDQvtCx0YDQvtCx0LrRgy4g0JLQuCDQvtGC0YDQuNC80LDRlNGC0LUg0L/QvtCy0ZbQtNC+0LzQu9C10L3QvdGPLCDQutC+0LvQuCDQstGW0L0g0LHRg9C00LUg0LPQvtGC0L7QstC40LkuJyxcbiAgICAgICAgICAgIGJlOiAn0JfQsNC/0ZbRgSDQv9Cw0YHQv9GP0YXQvtCy0LAg0LfQsNCz0YDRg9C20LDQvdGLINGWINCw0LTQv9GA0LDRntC70LXQvdGLINC90LAg0LDQv9GA0LDRhtC+0Z7QutGDLiDQktGLINCw0YLRgNGL0LzQsNC10YbQtSDQsNC/0LDQstGP0YjRh9GN0L3QvdC1LCDQutCw0LvRliDRkdC9INCx0YPQtNC30LUg0LPQsNGC0L7QstGLLicsXG4gICAgICAgICAgICB6aDogJ+W9lemfs+W3suaIkOWKn+S4iuS8oOW5tuWPkemAgeS7pei/m+ihjOWkhOeQhuOAgiDlh4blpIflpb3lkI7vvIzmgqjlsIbmlLbliLDpgJrnn6XjgIInLFxuICAgICAgICAgICAgcHQ6ICdBIGdyYXZhw6fDo28gZm9pIGNhcnJlZ2FkYSBjb20gc3VjZXNzbyBlIGVudmlhZGEgcGFyYSBwcm9jZXNzYW1lbnRvLiBWb2PDqiByZWNlYmVyw6EgdW1hIG5vdGlmaWNhw6fDo28gcXVhbmRvIGVzdGl2ZXIgcHJvbnRhLicsXG4gICAgICAgICAgICBiZzogJ9CX0LDQv9C40YHRitGCINC1INGD0YHQv9C10YjQvdC+INC60LDRh9C10L0g0Lgg0LjQt9C/0YDQsNGC0LXQvSDQt9CwINC+0LHRgNCw0LHQvtGC0LrQsC4g0KnQtSDQv9C+0LvRg9GH0LjRgtC1INC40LfQstC10YHRgtC40LUsINC60L7Qs9Cw0YLQviDQtSDQs9C+0YLQvtCyLicsXG4gICAgICAgICAgICBybzogJ8OObnJlZ2lzdHJhcmVhIGEgZm9zdCDDrm5jxINyY2F0xIMgY3Ugc3VjY2VzIMiZaSB0cmltaXPEgyBzcHJlIHByb2Nlc2FyZS4gVmXIm2kgcHJpbWkgbyBub3RpZmljYXJlIGPDom5kIGVzdGUgZ2F0YS4nXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX3VwbG9hZF9jb21wbGV0ZV9ub3RpZnk6IHtcbiAgICAgICAgICAgIHJ1OiAn0JfQsNC/0LjRgdGMINGD0YHQv9C10YjQvdC+INC+0LHRgNCw0LHQvtGC0LDQvdCwINC4INCz0L7RgtC+0LLQsCDQuiDQv9GA0L7RgdC80L7RgtGA0YMhJyxcbiAgICAgICAgICAgIGVuOiAnVGhlIHJlY29yZGluZyBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgcHJvY2Vzc2VkIGFuZCBpcyByZWFkeSBmb3Igdmlld2luZyEnLFxuICAgICAgICAgICAgdWs6ICfQl9Cw0L/QuNGBINGD0YHQv9GW0YjQvdC+INC+0LHRgNC+0LHQu9C10L3QviDRliDQs9C+0YLQvtCy0LjQuSDQtNC+INC/0LXRgNC10LPQu9GP0LTRgyEnLFxuICAgICAgICAgICAgYmU6ICfQl9Cw0L/RltGBINC/0LDRgdC/0Y/RhdC+0LLQsCDQsNC/0YDQsNGG0LDQstCw0L3RiyDRliDQs9Cw0YLQvtCy0Ysg0LTQsCDQv9GA0LDQs9C70Y/QtNGDIScsXG4gICAgICAgICAgICB6aDogJ+W9lemfs+W3suaIkOWKn+WkhOeQhu+8jOWPr+S7peingueci++8gScsXG4gICAgICAgICAgICBwdDogJ0EgZ3JhdmHDp8OjbyBmb2kgcHJvY2Vzc2FkYSBjb20gc3VjZXNzbyBlIGVzdMOhIHByb250YSBwYXJhIHZpc3VhbGl6YcOnw6NvIScsXG4gICAgICAgICAgICBiZzogJ9CX0LDQv9C40YHRitGCINC1INGD0YHQv9C10YjQvdC+INC+0LHRgNCw0LHQvtGC0LXQvSDQuCDQs9C+0YLQvtCyINC30LAg0LPQu9C10LTQsNC90LUhJyxcbiAgICAgICAgICAgIHJvOiAnw45ucmVnaXN0cmFyZWEgYSBmb3N0IHByb2Nlc2F0xIMgY3Ugc3VjY2VzIMiZaSBlc3RlIGdhdGEgcGVudHJ1IHZpemlvbmFyZSEnXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX3VwbG9hZF9lcnJvcl9ub3RpZnk6IHtcbiAgICAgICAgICAgIHJ1OiAn0J3QtSDRg9C00LDQu9C+0YHRjCDQvtCx0YDQsNCx0L7RgtCw0YLRjCDQt9Cw0L/QuNGB0YwuJyxcbiAgICAgICAgICAgIGVuOiAnRmFpbGVkIHRvIHByb2Nlc3MgdGhlIHJlY29yZGluZy4nLFxuICAgICAgICAgICAgdWs6ICfQndC1INCy0LTQsNC70L7RgdGPINC+0LHRgNC+0LHQuNGC0Lgg0LfQsNC/0LjRgS4nLFxuICAgICAgICAgICAgYmU6ICfQndC1INGe0LTQsNC70L7RgdGPINCw0L/RgNCw0YbQsNCy0LDRhtGMINC30LDQv9GW0YEuJyxcbiAgICAgICAgICAgIHpoOiAn5peg5rOV5aSE55CG5b2V6Z+z44CCJyxcbiAgICAgICAgICAgIHB0OiAnRmFsaGEgYW8gcHJvY2Vzc2FyIGEgZ3JhdmHDp8Ojby4nLFxuICAgICAgICAgICAgYmc6ICfQndC10YPRgdC/0LXRiNC90LAg0L7QsdGA0LDQsdC+0YLQutCwINC90LAg0LfQsNC/0LjRgdCwLicsXG4gICAgICAgICAgICBybzogJ1Byb2Nlc2FyZWEgw65ucmVnaXN0csSDcmlpIGEgZciZdWF0LidcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfdXBsb2FkX25vdGljZV90ZXh0OiB7XG4gICAgICAgICAgICBydTogJ9Ce0LHRgNCw0YLQuNGC0LUg0LLQvdC40LzQsNC90LjQtSwg0YfRgtC+INC/0L7RgdC70LUg0L/Rg9Cx0LvQuNC60LDRhtC40Lgg0LfQsNC/0LjRgdGMINGB0YLQsNC90LXRgiDQtNC+0YHRgtGD0L/QvdCwINC00LvRjyDQv9GA0L7RgdC80L7RgtGA0LAg0LLRgdC10Lwg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GP0Lwg0YHQtdGA0LLQuNGB0LAuJyxcbiAgICAgICAgICAgIGVuOiAnUGxlYXNlIG5vdGUgdGhhdCBhZnRlciBwdWJsaWNhdGlvbiwgdGhlIHJlY29yZGluZyB3aWxsIGJlIGF2YWlsYWJsZSBmb3Igdmlld2luZyBieSBhbGwgdXNlcnMgb2YgdGhlIHNlcnZpY2UuJyxcbiAgICAgICAgICAgIHVrOiAn0JfQstC10YDQvdGW0YLRjCDRg9Cy0LDQs9GDLCDRidC+INC/0ZbRgdC70Y8g0L/Rg9Cx0LvRltC60LDRhtGW0Zcg0LfQsNC/0LjRgSDRgdGC0LDQvdC1INC00L7RgdGC0YPQv9C90LjQuSDQtNC70Y8g0L/QtdGA0LXQs9C70Y/QtNGDINCy0YHRltC8INC60L7RgNC40YHRgtGD0LLQsNGH0LDQvCDRgdC10YDQstGW0YHRgy4nLFxuICAgICAgICAgICAgYmU6ICfQl9Cy0Y/RgNC90ZbRhtC1INGe0LLQsNCz0YMsINGI0YLQviDQv9Cw0YHQu9GPINC/0YPQsdC70ZbQutCw0YbRltGXINC30LDQv9GW0YEg0YHRgtCw0L3QtSDQtNCw0YHRgtGD0L/QvdGLINC00LvRjyDQv9GA0LDQs9C70Y/QtNGDINGe0YHRltC8INC60LDRgNGL0YHRgtCw0LvRjNC90ZbQutCw0Lwg0YHRjdGA0LLRltGB0YMuJyxcbiAgICAgICAgICAgIHpoOiAn6K+35rOo5oSP77yM5Y+R5biD5ZCO77yM5b2V6Z+z5bCG5a+55omA5pyJ5pyN5Yqh55So5oi35Y+v6KeB44CCJyxcbiAgICAgICAgICAgIHB0OiAnT2JzZXJ2ZSBxdWUsIGFww7NzIGEgcHVibGljYcOnw6NvLCBhIGdyYXZhw6fDo28gZXN0YXLDoSBkaXNwb27DrXZlbCBwYXJhIHZpc3VhbGl6YcOnw6NvIHBvciB0b2RvcyBvcyB1c3XDoXJpb3MgZG8gc2VydmnDp28uJyxcbiAgICAgICAgICAgIGJnOiAn0J7QsdGK0YDQvdC10YLQtSDQstC90LjQvNCw0L3QuNC1LCDRh9C1INGB0LvQtdC0INC/0YPQsdC70LjQutGD0LLQsNC90LXRgtC+INC30LDQv9C40YHQsCDRidC1INCx0YrQtNC1INC00L7RgdGC0YrQv9C10L0g0LfQsCDQv9GA0LXQs9C70LXQtCDQvtGCINCy0YHQuNGH0LrQuCDQv9C+0YLRgNC10LHQuNGC0LXQu9C4INC90LAg0YPRgdC70YPQs9Cw0YLQsC4nLFxuICAgICAgICAgICAgcm86ICdSZcibaW5lyJtpIGPEgywgZHVwxIMgcHVibGljYXJlLCDDrm5yZWdpc3RyYXJlYSB2YSBmaSBkaXNwb25pYmlsxIMgcGVudHJ1IHZpemlvbmFyZSB0dXR1cm9yIHV0aWxpemF0b3JpbG9yIHNlcnZpY2l1bHVpLidcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfdGl0bGVfZmF2b3JpdGU6IHtcbiAgICAgICAgICAgIHJ1OiAn0KHQvtGF0YDQsNC90LXQvdC90YvQtScsXG4gICAgICAgICAgICBlbjogJ0Zhdm9yaXRlcycsXG4gICAgICAgICAgICB1azogJ9CX0LHQtdGA0LXQttC10L3RlicsXG4gICAgICAgICAgICBiZTogJ9CX0LDRhdCw0LLQsNC90YvRjycsXG4gICAgICAgICAgICB6aDogJ+aUtuiXj+WkuScsXG4gICAgICAgICAgICBwdDogJ0Zhdm9yaXRvcycsXG4gICAgICAgICAgICBiZzogJ9Cb0Y7QsdC40LzQuCcsXG4gICAgICAgICAgICBybzogJ0Zhdm9yaXRlJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c190aXRsZV9jcmVhdGVkOiB7XG4gICAgICAgICAgICBydTogJ9Ch0L7Qt9C00LDQvdC90YvQtScsXG4gICAgICAgICAgICBlbjogJ0NyZWF0ZWQnLFxuICAgICAgICAgICAgdWs6ICfQodGC0LLQvtGA0LXQvdGWJyxcbiAgICAgICAgICAgIGJlOiAn0KHRgtCy0L7RgNCw0L3Ri9GPJyxcbiAgICAgICAgICAgIHpoOiAn5bey5Yib5bu6JyxcbiAgICAgICAgICAgIHB0OiAnQ3JpYWRvJyxcbiAgICAgICAgICAgIGJnOiAn0KHRitC30LTQsNC00LXQvdC4JyxcbiAgICAgICAgICAgIHJvOiAnQ3JlYXRlJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c190aXRsZV9saWtlczoge1xuICAgICAgICAgICAgcnU6ICfQndGA0LDQstC40YLRgdGPJyxcbiAgICAgICAgICAgIGVuOiAnTGlrZXMnLFxuICAgICAgICAgICAgdWs6ICfQn9C+0LTQvtCx0LDRlNGC0YzRgdGPJyxcbiAgICAgICAgICAgIGJlOiAn0J/QsNC00LDQsdCw0LXRhtGG0LAnLFxuICAgICAgICAgICAgemg6ICfllpzmrKInLFxuICAgICAgICAgICAgcHQ6ICdDdXJ0aWRhcycsXG4gICAgICAgICAgICBiZzogJ9Cl0LDRgNC10YHQstCw0L3QuNGPJyxcbiAgICAgICAgICAgIHJvOiAnQXByZWNpZXJpJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c190aXRsZV9zYXZlZDoge1xuICAgICAgICAgICAgcnU6ICfQodC+0YXRgNCw0L3QtdC90L4nLFxuICAgICAgICAgICAgZW46ICdTYXZlZCcsXG4gICAgICAgICAgICB1azogJ9CX0LHQtdGA0LXQttC10L3QvicsXG4gICAgICAgICAgICBiZTogJ9CX0LDRhdCw0LLQsNC90LAnLFxuICAgICAgICAgICAgemg6ICflt7Lkv53lrZgnLFxuICAgICAgICAgICAgcHQ6ICdTYWx2bycsXG4gICAgICAgICAgICBiZzogJ9CX0LDQv9Cw0LfQtdC90L4nLFxuICAgICAgICAgICAgcm86ICdTYWx2YXRlJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c19zdGF0dXNfZXJyb3I6IHtcbiAgICAgICAgICAgIHJ1OiAn0J7RiNC40LHQutCwJyxcbiAgICAgICAgICAgIGVuOiAnRXJyb3InLFxuICAgICAgICAgICAgdWs6ICfQn9C+0LzQuNC70LrQsCcsXG4gICAgICAgICAgICBiZTogJ9Cf0LDQvNGL0LvQutCwJyxcbiAgICAgICAgICAgIHpoOiAn6ZSZ6K+vJyxcbiAgICAgICAgICAgIHB0OiAnRXJybycsXG4gICAgICAgICAgICBiZzogJ9CT0YDQtdGI0LrQsCcsXG4gICAgICAgICAgICBybzogJ0Vyb2FyZSdcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfc3RhdHVzX3Byb2Nlc3Npbmc6IHtcbiAgICAgICAgICAgIHJ1OiAn0J7QsdGA0LDQsdC+0YLQutCwJyxcbiAgICAgICAgICAgIGVuOiAnUHJvY2Vzc2luZycsXG4gICAgICAgICAgICB1azogJ9Ce0LHRgNC+0LHQutCwJyxcbiAgICAgICAgICAgIGJlOiAn0JDQv9GA0LDRhtC+0Z7QutCwJyxcbiAgICAgICAgICAgIHpoOiAn5aSE55CG5LitJyxcbiAgICAgICAgICAgIHB0OiAnUHJvY2Vzc2FuZG8nLFxuICAgICAgICAgICAgYmc6ICfQntCx0YDQsNCx0L7RgtC60LAnLFxuICAgICAgICAgICAgcm86ICdTZSBwcm9jZXNlYXrEgydcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfc3RhdHVzX3JlYWR5OiB7XG4gICAgICAgICAgICBydTogJ9CX0LDQs9GA0YPQttC10L3QvicsXG4gICAgICAgICAgICBlbjogJ1JlYWR5JyxcbiAgICAgICAgICAgIHVrOiAn0JfQsNCy0LDQvdGC0LDQttC10L3QvicsXG4gICAgICAgICAgICBiZTogJ9CX0LDQs9GA0YPQttCw0L3QsCcsXG4gICAgICAgICAgICB6aDogJ+W3suWwsee7qicsXG4gICAgICAgICAgICBwdDogJ0NhcnJlZ2FkbycsXG4gICAgICAgICAgICBiZzogJ9Ca0LDRh9C10L3QvicsXG4gICAgICAgICAgICBybzogJ0dhdGEnXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX3N0YXR1c19ibG9ja2VkOiB7XG4gICAgICAgICAgICBydTogJ9CX0LDQsdC70L7QutC40YDQvtCy0LDQvdC+JyxcbiAgICAgICAgICAgIGVuOiAnQmxvY2tlZCcsXG4gICAgICAgICAgICB1azogJ9CX0LDQsdC70L7QutC+0LLQsNC90L4nLFxuICAgICAgICAgICAgYmU6ICfQl9Cw0LHQu9Cw0LrRltGA0LDQstCw0L3QsCcsXG4gICAgICAgICAgICB6aDogJ+W3suWwgemUgScsXG4gICAgICAgICAgICBwdDogJ0Jsb3F1ZWFkbycsXG4gICAgICAgICAgICBiZzogJ9CR0LvQvtC60LjRgNCw0L3QvicsXG4gICAgICAgICAgICBybzogJ0Jsb2NhdCdcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfc3RhdHVzX2RlbGV0ZWQ6IHtcbiAgICAgICAgICAgIHJ1OiAn0KPQtNCw0LvQtdC90L4nLFxuICAgICAgICAgICAgZW46ICdEZWxldGVkJyxcbiAgICAgICAgICAgIHVrOiAn0JLQuNC00LDQu9C10L3QvicsXG4gICAgICAgICAgICBiZTogJ9CS0YvQtNCw0LvQtdC90LAnLFxuICAgICAgICAgICAgemg6ICflt7LliKDpmaQnLFxuICAgICAgICAgICAgcHQ6ICdFeGNsdcOtZG8nLFxuICAgICAgICAgICAgYmc6ICfQmNC30YLRgNC40YLQvicsXG4gICAgICAgICAgICBybzogJ8iYdGVycydcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfbW9kYWxfZXJyb3JfcmVjb3JkaW5nX3R4dF8xOiB7XG4gICAgICAgICAgICBydTogJ9Cd0LUg0YPQtNCw0LvQvtGB0Ywg0L3QsNGH0LDRgtGMINC30LDQv9C40YHRjC4nLFxuICAgICAgICAgICAgZW46ICdGYWlsZWQgdG8gc3RhcnQgcmVjb3JkaW5nLicsXG4gICAgICAgICAgICB1azogJ9Cd0LUg0LLQtNCw0LvQvtGB0Y8g0L/QvtGH0LDRgtC4INC30LDQv9C40YEuJyxcbiAgICAgICAgICAgIGJlOiAn0J3QtSDRntC00LDQu9C+0YHRjyDQv9Cw0YfQsNGG0Ywg0LfQsNC/0ZbRgS4nLFxuICAgICAgICAgICAgemg6ICfml6Dms5XlvIDlp4vlvZXliLbjgIInLFxuICAgICAgICAgICAgcHQ6ICdGYWxoYSBhbyBpbmljaWFyIGEgZ3JhdmHDp8Ojby4nLFxuICAgICAgICAgICAgYmc6ICfQndC10YPRgdC/0LXRiNC90L4g0YHRgtCw0YDRgtC40YDQsNC90LUg0L3QsCDQt9Cw0L/QuNGB0LAuJyxcbiAgICAgICAgICAgIHJvOiAnUG9ybmlyZWEgw65ucmVnaXN0csSDcmlpIGEgZciZdWF0LidcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfbW9kYWxfZXJyb3JfcmVjb3JkaW5nX3R4dF8yOiB7XG4gICAgICAgICAgICBydTogJ9Cf0L7Qv9GA0L7QsdGD0LnRgtC1INGB0LzQtdC90LjRgtGMINC40YHRgtC+0YfQvdC40Log0LLQuNC00LXQviDQvdCwINC00YDRg9Cz0L7QuSDQuCDQv9C+0LLRgtC+0YDQuNGC0Ywg0L/QvtC/0YvRgtC60YMuJyxcbiAgICAgICAgICAgIGVuOiAnVHJ5IGNoYW5naW5nIHRoZSB2aWRlbyBzb3VyY2UgdG8gYW5vdGhlciBhbmQgdHJ5IGFnYWluLicsXG4gICAgICAgICAgICB1azogJ9Ch0L/RgNC+0LHRg9C50YLQtSDQt9C80ZbQvdC40YLQuCDQtNC20LXRgNC10LvQviDQstGW0LTQtdC+INC90LAg0ZbQvdGI0LUg0YLQsCDQv9C+0LLRgtC+0YDRltGC0Ywg0YHQv9GA0L7QsdGDLicsXG4gICAgICAgICAgICBiZTogJ9Cf0LDRgdC/0YDQsNCx0YPQudGG0LUg0LfQvNGP0L3RltGG0Ywg0LrRgNGL0L3RltGG0YMg0LLRltC00Y3QsCDQvdCwINGW0L3RiNGD0Y4g0ZYg0L/QsNGB0L/RgNCw0LHRg9C50YbQtSDRj9GI0YfRjSDRgNCw0LcuJyxcbiAgICAgICAgICAgIHpoOiAn5bCd6K+V5bCG6KeG6aKR5rqQ5pu05pS55Li65Y+m5LiA5Liq5bm26YeN6K+V44CCJyxcbiAgICAgICAgICAgIHB0OiAnVGVudGUgYWx0ZXJhciBhIGZvbnRlIGRlIHbDrWRlbyBwYXJhIG91dHJhIGUgdGVudGUgbm92YW1lbnRlLicsXG4gICAgICAgICAgICBiZzogJ9Ce0L/QuNGC0LDQudGC0LUg0LTQsCDRgdC80LXQvdC40YLQtSDQstC40LTQtdC+INC40LfRgtC+0YfQvdC40LrQsCDQvdCwINC00YDRg9CzINC4INC+0L/QuNGC0LDQudGC0LUg0L7RgtC90L7QstC+LicsXG4gICAgICAgICAgICBybzogJ8OObmNlcmNhyJtpIHPEgyBzY2hpbWJhyJtpIHN1cnNhIHZpZGVvIMiZaSByZcOubmNlcmNhyJtpLidcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfYnV0dG9uX2dvb2Q6IHtcbiAgICAgICAgICAgIHJ1OiAn0KXQvtGA0L7RiNC+JyxcbiAgICAgICAgICAgIGVuOiAnRG9uZScsXG4gICAgICAgICAgICB1azogJ9CT0L7RgtC+0LLQvicsXG4gICAgICAgICAgICBiZTogJ9CT0LDRgtC+0LLQsCcsXG4gICAgICAgICAgICB6aDogJ+WujOaIkCcsXG4gICAgICAgICAgICBwdDogJ0NvbmNsdcOtZG8nLFxuICAgICAgICAgICAgYmc6ICfQk9C+0YLQvtCy0L4nLFxuICAgICAgICAgICAgcm86ICdHYXRhJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c19idXR0b25fcmVwb3J0OiB7XG4gICAgICAgICAgICBydTogJ9Cf0L7QtNCw0YLRjCDQttCw0LvQvtCx0YMnLFxuICAgICAgICAgICAgZW46ICdSZXBvcnQnLFxuICAgICAgICAgICAgdWs6ICfQn9C+0YHQutCw0YDQttC40YLQuNGB0Y8nLFxuICAgICAgICAgICAgYmU6ICfQn9Cw0YHQutCw0YDQtNC30ZbRhtGG0LAnLFxuICAgICAgICAgICAgemg6ICfkuL7miqUnLFxuICAgICAgICAgICAgcHQ6ICdEZW51bmNpYXInLFxuICAgICAgICAgICAgYmc6ICfQlNC+0LrQu9Cw0LTQstCw0LknLFxuICAgICAgICAgICAgcm86ICdSYXBvcnRlYXrEgydcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfYnV0dG9uX2RlbGV0ZV92aWRlbzoge1xuICAgICAgICAgICAgcnU6ICfQo9C00LDQu9C40YLRjCDQt9Cw0L/QuNGB0YwnLFxuICAgICAgICAgICAgZW46ICdEZWxldGUgcmVjb3JkaW5nJyxcbiAgICAgICAgICAgIHVrOiAn0JLQuNC00LDQu9C40YLQuCDQt9Cw0L/QuNGBJyxcbiAgICAgICAgICAgIGJlOiAn0JLQuNC00LDQu9GW0YbRjCDQt9Cw0L/RltGBJyxcbiAgICAgICAgICAgIHpoOiAn5Yig6Zmk5b2V6Z+zJyxcbiAgICAgICAgICAgIHB0OiAnRXhjbHVpciBncmF2YcOnw6NvJyxcbiAgICAgICAgICAgIGJnOiAn0JjQt9GC0YDQuNC5INC30LDQv9C40YHQsCcsXG4gICAgICAgICAgICBybzogJ8iYdGVyZ2Ugw65ucmVnaXN0cmFyZWEnXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX21vZGFsX3JlcG9ydF90eHRfMToge1xuICAgICAgICAgICAgcnU6ICfQktGLINGD0LLQtdGA0LXQvdGLLCDRh9GC0L4g0YXQvtGC0LjRgtC1INC/0L7QtNCw0YLRjCDQttCw0LvQvtCx0YMg0L3QsCDRjdGC0L4gdmlkZW8/JyxcbiAgICAgICAgICAgIGVuOiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlcG9ydCB0aGlzIHZpZGVvPycsXG4gICAgICAgICAgICB1azogJ9CS0Lgg0LLQv9C10LLQvdC10L3Rliwg0YnQviDRhdC+0YfQtdGC0LUg0L/QvtC00LDRgtC4INGB0LrQsNGA0LPRgyDQvdCwINGG0LUg0LLRltC00LXQvj8nLFxuICAgICAgICAgICAgYmU6ICfQktGLINGe0L/RjdGe0L3QtdC90YvRjywg0YjRgtC+INGF0L7Rh9Cw0YbQtSDQv9Cw0YHQutCw0YDQtNC30ZbRhtGG0LAg0L3QsCDQs9GN0YLQsCDQstGW0LTRjdCwPycsXG4gICAgICAgICAgICB6aDogJ+aCqOehruWumuimgeS4vuaKpeatpOinhumikeWQl++8nycsXG4gICAgICAgICAgICBwdDogJ1RlbSBjZXJ0ZXphIGRlIHF1ZSBkZXNlamEgZGVudW5jaWFyIGVzdGUgdsOtZGVvPycsXG4gICAgICAgICAgICBiZzogJ9Ch0LjQs9GD0YDQvdC4INC70Lgg0YHRgtC1LCDRh9C1INC40YHQutCw0YLQtSDQtNCwINC00L7QutC70LDQtNCy0LDRgtC1INGC0L7QstCwINCy0LjQtNC10L4/JyxcbiAgICAgICAgICAgIHJvOiAnU2lndXIgZG9yacibaSBzxIMgcmFwb3J0YcibaSBhY2VzdCB2aWRlb2NsaXA/J1xuICAgICAgICB9LFxuICAgICAgICBzaG90c19tb2RhbF9yZXBvcnRfdHh0XzI6IHtcbiAgICAgICAgICAgIHJ1OiAn0JLQuNC00LXQviDQuNC80LXQtdGCINC90LXRhtC10L3Qt9GD0YDQvdC+0LUg0YHQvtC00LXRgNC20LDQvdC40LUsINC90LDRgdC40LvQuNC1INC40LvQuCDQtNGA0YPQs9C40LUg0L3QtdC/0YDQuNC10LzQu9C10LzRi9C1INC80LDRgtC10YDQuNCw0LvRiy4nLFxuICAgICAgICAgICAgZW46ICdUaGUgdmlkZW8gY29udGFpbnMgb2JzY2VuZSBjb250ZW50LCB2aW9sZW5jZSwgb3Igb3RoZXIgdW5hY2NlcHRhYmxlIG1hdGVyaWFscy4nLFxuICAgICAgICAgICAgdWs6ICfQktGW0LTQtdC+INC80ZbRgdGC0LjRgtGMINC90LXQv9GA0LjRgdGC0L7QudC90LjQuSDQutC+0L3RgtC10L3Rgiwg0L3QsNGB0LjQu9GM0YHRgtCy0L4g0LDQsdC+INGW0L3RiNGWINC90LXQv9GA0LjQudC90Y/RgtC90ZYg0LzQsNGC0LXRgNGW0LDQu9C4LicsXG4gICAgICAgICAgICBiZTogJ9CS0ZbQtNGN0LAg0LfQvNGP0YjRh9Cw0LUg0L3QtdC/0YDRi9GB0YLQvtC50L3RiyDQutCw0L3RgtGN0L3Rgiwg0LPQstCw0LvRgiDQsNCx0L4g0ZbQvdGI0YvRjyDQvdC10L/RgNGL0LzQsNC70YzQvdGL0Y8g0LzQsNGC0Y3RgNGL0Y/Qu9GLLicsXG4gICAgICAgICAgICB6aDogJ+ivpeinhumikeWMheWQq+a3q+enveWGheWuueOAgeaatOWKm+aIluWFtuS7luS4jeWPr+aOpeWPl+eahOadkOaWmeOAgicsXG4gICAgICAgICAgICBwdDogJ08gdsOtZGVvIGNvbnTDqW0gY29udGXDumRvIG9ic2Nlbm8sIHZpb2zDqm5jaWEgb3Ugb3V0cm9zIG1hdGVyaWFpcyBpbmFjZWl0w6F2ZWlzLicsXG4gICAgICAgICAgICBiZzogJ9CS0LjQtNC10L7RgtC+INGB0YrQtNGK0YDQttCwINC90LXQv9GA0LjRgdGC0L7QudC90L4g0YHRitC00YrRgNC20LDQvdC40LUsINC90LDRgdC40LvQuNC1INC40LvQuCDQtNGA0YPQs9C4INC90LXQv9GA0LjQtdC80LvQuNCy0Lgg0LzQsNGC0LXRgNC40LDQu9C4LicsXG4gICAgICAgICAgICBybzogJ1ZpZGVvY2xpcHVsIGNvbsibaW5lIGxpbWJhaiBvYnNjZW4sIHZpb2xlbsibxIMgc2F1IGFsdGUgbWF0ZXJpYWxlIGluYWNjZXB0YWJpbGUuJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c19tb2RhbF9yZXBvcnRfdHh0XzM6IHtcbiAgICAgICAgICAgIHJ1OiAn0J/QvtGB0LvQtSDQv9C+0LTQsNGH0Lgg0LbQsNC70L7QsdGLINC00LDQvdC90L7QtSDQstC40LTQtdC+INC/0L7Qu9GD0YfQuNGCINGI0YLRgNCw0YTQvdGL0LUg0LHQsNC70LvRiy4g0J/RgNC4INC90LDQutC+0L/Qu9C10L3QuNC4INC+0L/RgNC10LTQtdC70LXQvdC90L7Qs9C+INC60L7Qu9C40YfQtdGB0YLQstCwINGI0YLRgNCw0YTQvdGL0YUg0LHQsNC70LvQvtCyINCy0LjQtNC10L4g0LHRg9C00LXRgiDRg9C00LDQu9C10L3Qvi4nLFxuICAgICAgICAgICAgZW46ICdBZnRlciByZXBvcnRpbmcsIHRoaXMgdmlkZW8gd2lsbCByZWNlaXZlIHBlbmFsdHkgcG9pbnRzLiBVcG9uIGFjY3VtdWxhdGluZyBhIGNlcnRhaW4gbnVtYmVyIG9mIHBlbmFsdHkgcG9pbnRzLCB0aGUgdmlkZW8gd2lsbCBiZSBkZWxldGVkLicsXG4gICAgICAgICAgICB1azogJ9Cf0ZbRgdC70Y8g0L/QvtC00LDQvdC90Y8g0YHQutCw0YDQs9C4INGG0LUg0LLRltC00LXQviDQvtGC0YDQuNC80LDRlCDRiNGC0YDQsNGE0L3RliDQsdCw0LvQuC4g0J/RgNC4INC90LDQutC+0L/QuNGH0LXQvdC90ZYg0L/QtdCy0L3QvtGXINC60ZbQu9GM0LrQvtGB0YLRliDRiNGC0YDQsNGE0L3QuNGFINCx0LDQu9GW0LIg0LLRltC00LXQviDQsdGD0LTQtSDQstC40LTQsNC70LXQvdC+LicsXG4gICAgICAgICAgICBiZTogJ9Cf0LDRgdC70Y8g0L/QsNC00LDRh9GLINGB0LrQsNGA0LPRliDQs9GN0YLQsCDQstGW0LTRjdCwINCw0YLRgNGL0LzQsNC1INGI0YLRgNCw0YTQvdGL0Y8g0LHQsNC70YsuINCf0YDRiyDQvdCw0LfQsNC/0LDRiNCy0LDQvdC90ZYg0L/RjdGe0L3QsNC5INC60L7Qu9GM0LrQsNGB0YbRliDRiNGC0YDQsNGE0L3Ri9GFINCx0LDQu9Cw0Z4g0LLRltC00Y3QsCDQsdGD0LTQt9C1INCy0YvQtNCw0LvQtdC90LAuJyxcbiAgICAgICAgICAgIHpoOiAn5Li+5oql5ZCO77yM6K+l6KeG6aKR5bCG6I635b6X5aSE572a5YiG5pWw44CCIOe0r+enr+S4gOWumuaVsOmHj+eahOWkhOe9muWIhuaVsOWQju+8jOinhumikeWwhuiiq+WIoOmZpOOAgicsXG4gICAgICAgICAgICBwdDogJ0Fww7NzIGEgZGVuw7puY2lhLCBlc3RlIHbDrWRlbyByZWNlYmVyw6EgcG9udG9zIGRlIHBlbmFsaWRhZGUuIEFvIGFjdW11bGFyIHVtIGNlcnRvIG7Dum1lcm8gZGUgcG9udG9zIGRlIHBlbmFsaWRhZGUsIG8gdsOtZGVvIHNlcsOhIGV4Y2x1w61kby4nLFxuICAgICAgICAgICAgYmc6ICfQodC70LXQtCDQtNC+0LrQu9Cw0LTQstCw0L3QtdGC0L4g0YLQvtCy0LAg0LLQuNC00LXQviDRidC1INC/0L7Qu9GD0YfQuCDQvdCw0LrQsNC30LDRgtC10LvQvdC4INGC0L7Rh9C60LguINCf0YDQuCDQvdCw0YLRgNGD0L/QstCw0L3QtSDQvdCwINC+0L/RgNC10LTQtdC70LXQvSDQsdGA0L7QuSDQvdCw0LrQsNC30LDRgtC10LvQvdC4INGC0L7Rh9C60Lgg0LLQuNC00LXQvtGC0L4g0YnQtSDQsdGK0LTQtSDQuNC30YLRgNC40YLQvi4nLFxuICAgICAgICAgICAgcm86ICdEdXDEgyByYXBvcnRhcmUsIGFjZXN0IHZpZGVvY2xpcCB2YSBwcmltaSBwdW5jdGUgZGUgcGVuYWxpemFyZS4gTGEgYWN1bXVsYXJlYSB1bnVpIGFudW1pdCBudW3Eg3IgZGUgcHVuY3RlLCB2aWRlb2NsaXB1bCB2YSBmaSDImXRlcnMuJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c19tb2RhbF9yZXBvcnRfYmVsbDoge1xuICAgICAgICAgICAgcnU6ICfQltCw0LvQvtCx0LAg0L7RgtC/0YDQsNCy0LvQtdC90LAnLFxuICAgICAgICAgICAgZW46ICdSZXBvcnQgc3VibWl0dGVkJyxcbiAgICAgICAgICAgIHVrOiAn0KHQutCw0YDQs9CwINC90LDQtNGW0YHQu9Cw0L3QsCcsXG4gICAgICAgICAgICBiZTogJ9Ch0LrQsNGA0LPQsCDQsNC00L/RgNCw0Z7Qu9C10L3QsCcsXG4gICAgICAgICAgICB6aDogJ+S4vuaKpeW3suaPkOS6pCcsXG4gICAgICAgICAgICBwdDogJ0RlbsO6bmNpYSBlbnZpYWRhJyxcbiAgICAgICAgICAgIGJnOiAn0JTQvtC60LvQsNC00YrRgiDQtSDQuNC30L/RgNCw0YLQtdC9JyxcbiAgICAgICAgICAgIHJvOiAnUmFwb3J0dWwgYSBmb3N0IHRyaW1pcydcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfbW9kYWxfcmVwb3J0X2JlbGxfYWxyZWFkeWVkOiB7XG4gICAgICAgICAgICBydTogJ9CS0Ysg0YPQttC1INC/0L7QtNCw0LLQsNC70Lgg0LbQsNC70L7QsdGDINC90LAg0Y3RgtC+INCy0LjQtNC10L4nLFxuICAgICAgICAgICAgZW46ICdZb3UgaGF2ZSBhbHJlYWR5IHJlcG9ydGVkIHRoaXMgdmlkZW8nLFxuICAgICAgICAgICAgdWs6ICfQktC4INCy0LbQtSDQv9C+0LTQsNCy0LDQu9C4INGB0LrQsNGA0LPRgyDQvdCwINGG0LUg0LLRltC00LXQvicsXG4gICAgICAgICAgICBiZTogJ9CS0Ysg0Z7QttC+INC/0LDQtNCw0LLQsNC70ZYg0YHQutCw0YDQs9GDINC90LAg0LPRjdGC0LAg0LLRltC00Y3QsCcsXG4gICAgICAgICAgICB6aDogJ+aCqOW3suS4vuaKpeatpOinhumikScsXG4gICAgICAgICAgICBwdDogJ1ZvY8OqIGrDoSBkZW51bmNpb3UgZXN0ZSB2w61kZW8nLFxuICAgICAgICAgICAgYmc6ICfQktC10YfQtSDRgdGC0LUg0LTQvtC60LvQsNC00LLQsNC70Lgg0YLQvtCy0LAg0LLQuNC00LXQvicsXG4gICAgICAgICAgICBybzogJ0HIm2kgcmFwb3J0YXQgZGVqYSBhY2VzdCB2aWRlb2NsaXAnXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX21vZGFsX2RlbGV0ZWRfYmVsbDoge1xuICAgICAgICAgICAgcnU6ICfQl9Cw0L/QuNGB0Ywg0YPRgdC/0LXRiNC90L4g0YPQtNCw0LvQtdC90LAnLFxuICAgICAgICAgICAgZW46ICdSZWNvcmRpbmcgc3VjY2Vzc2Z1bGx5IGRlbGV0ZWQnLFxuICAgICAgICAgICAgdWs6ICfQl9Cw0L/QuNGBINGD0YHQv9GW0YjQvdC+INCy0LjQtNCw0LvQtdC90L4nLFxuICAgICAgICAgICAgYmU6ICfQl9Cw0L/RltGBINC/0LDRgdC/0Y/RhdC+0LLQsCDQstGL0LTQsNC70LXQvdGLJyxcbiAgICAgICAgICAgIHpoOiAn5b2V6Z+z5bey5oiQ5Yqf5Yig6ZmkJyxcbiAgICAgICAgICAgIHB0OiAnR3JhdmHDp8OjbyBleGNsdcOtZGEgY29tIHN1Y2Vzc28nLFxuICAgICAgICAgICAgYmc6ICfQl9Cw0L/QuNGB0YrRgiDQtSDRg9GB0L/QtdGI0L3QviDQuNC30YLRgNC40YInLFxuICAgICAgICAgICAgcm86ICfDjm5yZWdpc3RyYXJlYSBhIGZvc3QgyJl0ZWFyc8SDIGN1IHN1Y2NlcydcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfbW9kYWxfZGVsZXRlX3R4dF8xOiB7XG4gICAgICAgICAgICBydTogJ9CS0Ysg0YPQstC10YDQtdC90YssINGH0YLQviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINC30LDQv9C40YHRjD8nLFxuICAgICAgICAgICAgZW46ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcmVjb3JkaW5nPycsXG4gICAgICAgICAgICB1azogJ9CS0Lgg0LLQv9C10LLQvdC10L3Rliwg0YnQviDRhdC+0YfQtdGC0LUg0LLQuNC00LDQu9C40YLQuCDRhtC10Lkg0LfQsNC/0LjRgT8nLFxuICAgICAgICAgICAgYmU6ICfQktGLINGe0L/RjdGe0L3QtdC90YvRjywg0YjRgtC+INGF0L7Rh9Cw0YbQtSDQstGL0LTQsNC70ZbRhtGMINCz0Y3RgtGLINC30LDQv9GW0YE/JyxcbiAgICAgICAgICAgIHpoOiAn5oKo56Gu5a6a6KaB5Yig6Zmk5q2k5b2V6Z+z5ZCX77yfJyxcbiAgICAgICAgICAgIHB0OiAnVGVtIGNlcnRlemEgZGUgcXVlIGRlc2VqYSBleGNsdWlyIGVzdGEgZ3JhdmHDp8Ojbz8nLFxuICAgICAgICAgICAgYmc6ICfQodC40LPRg9GA0L3QuCDQu9C4INGB0YLQtSwg0YfQtSDQuNGB0LrQsNGC0LUg0LTQsCDQuNC30YLRgNC40LXRgtC1INGC0L7Qt9C4INC30LDQv9C40YE/JyxcbiAgICAgICAgICAgIHJvOiAnU2lndXIgZG9yacibaSBzxIMgyJl0ZXJnZcibaSBhY2Vhc3TEgyDDrm5yZWdpc3RyYXJlPydcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfbW9kYWxfZGVsZXRlX3R4dF8yOiB7XG4gICAgICAgICAgICBydTogJ9CX0LDQv9C40YHRjCDQsdGD0LTQtdGCINGD0LTQsNC70LXQvdCwINC90LDQstGB0LXQs9C00LAg0Lgg0L3QtSDRgdC80L7QttC10YIg0LHRi9GC0Ywg0LLQvtGB0YHRgtCw0L3QvtCy0LvQtdC90LAuJyxcbiAgICAgICAgICAgIGVuOiAnVGhlIHJlY29yZGluZyB3aWxsIGJlIHBlcm1hbmVudGx5IGRlbGV0ZWQgYW5kIGNhbm5vdCBiZSByZWNvdmVyZWQuJyxcbiAgICAgICAgICAgIHVrOiAn0JfQsNC/0LjRgSDQsdGD0LTQtSDQvdCw0LfQsNCy0LbQtNC4INCy0LjQtNCw0LvQtdC90L4g0ZYg0L3QtSDQvNC+0LbQtSDQsdGD0YLQuCDQstGW0LTQvdC+0LLQu9C10L3Qvi4nLFxuICAgICAgICAgICAgYmU6ICfQl9Cw0L/RltGBINCx0YPQtNC30LUg0L3QsNC30LDRntC20LTRiyDQstGL0LTQsNC70LXQvdGLINGWINC90LUg0LzQvtC20LAg0LHRi9GG0Ywg0LDQtNC90L7RntC70LXQvdGLLicsXG4gICAgICAgICAgICB6aDogJ+W9lemfs+Wwhuiiq+awuOS5heWIoOmZpO+8jOaXoOazleaBouWkjeOAgicsXG4gICAgICAgICAgICBwdDogJ0EgZ3JhdmHDp8OjbyBzZXLDoSBleGNsdcOtZGEgcGVybWFuZW50ZW1lbnRlIGUgbsOjbyBwb2RlcsOhIHNlciByZWN1cGVyYWRhLicsXG4gICAgICAgICAgICBiZzogJ9CX0LDQv9C40YHRitGCINGJ0LUg0LHRitC00LUg0LjQt9GC0YDQuNGCINC30LDQstC40L3QsNCz0Lgg0Lgg0L3QtSDQvNC+0LbQtSDQtNCwINCx0YrQtNC1INCy0YrQt9GB0YLQsNC90L7QstC10L0uJyxcbiAgICAgICAgICAgIHJvOiAnw45ucmVnaXN0cmFyZWEgdmEgZmkgyJl0ZWFyc8SDIGRlZmluaXRpdiDImWkgbnUgcG9hdGUgZmkgcmVjdXBlcmF0xIMuJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c19tb2RhbF9xdW90YV90eHRfMToge1xuICAgICAgICAgICAgcnU6ICfQndC1INGC0L7RgNC+0L/QuNGC0LXRgdGMINC30LDQv9C40YHRi9Cy0LDRgtGMINC90L7QstGL0Lkg0LzQvtC80LXQvdGCIScsXG4gICAgICAgICAgICBlbjogJ0RvblxcJ3QgcnVzaCB0byByZWNvcmQgYSBuZXcgbW9tZW50IScsXG4gICAgICAgICAgICB1azogJ9Cd0LUg0L/QvtGB0L/RltGI0LDQudGC0LUg0LfQsNC/0LjRgdGD0LLQsNGC0Lgg0L3QvtCy0LjQuSDQvNC+0LzQtdC90YIhJyxcbiAgICAgICAgICAgIGJlOiAn0J3QtSDRgdC/0Y/RiNCw0LnRhtC10YHRjyDQt9Cw0L/RltGB0LLQsNGG0Ywg0L3QvtCy0Ysg0LzQvtC80LDQvdGCIScsXG4gICAgICAgICAgICB6aDogJ+S4jeimgeaApeS6juiusOW9leaWsOaXtuWIu++8gScsXG4gICAgICAgICAgICBwdDogJ07Do28gc2UgYXByZXNzZSBwYXJhIGdyYXZhciB1bSBub3ZvIG1vbWVudG8hJyxcbiAgICAgICAgICAgIGJnOiAn0J3QtSDQsdGK0YDQt9Cw0LnRgtC1INC00LAg0LfQsNC/0LjRgdCy0LDRgtC1INC90L7QsiDQvNC+0LzQtdC90YIhJyxcbiAgICAgICAgICAgIHJvOiAnTnUgdsSDIGdyxINiacibaSBzxIMgw65ucmVnaXN0cmHIm2kgdW4gbW9tZW50IG5vdSEnXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX21vZGFsX3F1b3RhX3R4dF8yOiB7XG4gICAgICAgICAgICBydTogJ9CU0LXQudGB0YLQstGD0Y7RgtGB0Y8g0L7Qs9GA0LDQvdC40YfQtdC90LjRjyDQvdCwINGH0LDRgdGC0L7RgtGDINC30LDQv9C40YHQuCwg0YfRgtC+0LHRiyDQuNC30LHQtdC20LDRgtGMINC/0LXRgNC10LPRgNGD0LfQutC4INGB0LXRgNCy0LjRgdCwLiDQktCw0Lwg0L3Rg9C20L3QviDQv9C+0LTQvtC20LTQsNGC0Ywg0LXRidC1IHt0aW1lfScsXG4gICAgICAgICAgICBlbjogJ1RoZXJlIGFyZSByZXN0cmljdGlvbnMgb24gdGhlIGZyZXF1ZW5jeSBvZiByZWNvcmRpbmcgdG8gYXZvaWQgb3ZlcmxvYWRpbmcgdGhlIHNlcnZpY2UuIFlvdSBuZWVkIHRvIHdhaXQgYW5vdGhlciB7dGltZX0nLFxuICAgICAgICAgICAgdWs6ICfQhtGB0L3Rg9GO0YLRjCDQvtCx0LzQtdC20LXQvdC90Y8g0L3QsCDRh9Cw0YHRgtC+0YLRgyDQt9Cw0L/QuNGB0YMsINGJ0L7QsSDRg9C90LjQutC90YPRgtC4INC/0LXRgNC10LLQsNC90YLQsNC20LXQvdC90Y8g0YHQtdGA0LLRltGB0YMuINCS0LDQvCDQv9C+0YLRgNGW0LHQvdC+INC/0L7Rh9C10LrQsNGC0Lgg0YnQtSB7dGltZX0nLFxuICAgICAgICAgICAgYmU6ICfQhtGB0L3Rg9GO0YbRjCDQsNCx0LzQtdC20LDQstCw0L3QvdGWINC90LAg0YfQsNGB0YLQsNGC0YMg0LfQsNC/0ZbRgdGDLCDQutCw0LEg0L/QsNC30LHQtdCz0L3Rg9GG0Ywg0L/QtdGA0LDQs9GA0YPQt9C60ZYg0YHRjdGA0LLRltGB0YMuINCS0LDQvCDRgtGA0Y3QsdCwINC/0LDRh9Cw0LrQsNGG0Ywg0Y/RiNGH0Y0ge3RpbWV9JyxcbiAgICAgICAgICAgIHpoOiAn5a+55b2V6Z+z6aKR546H5pyJ5LiA5a6a6ZmQ5Yi277yM5Lul6YG/5YWN5pyN5Yqh6L+H6L2944CCIOaCqOmcgOimgeWGjeetiSB7dGltZX0nLFxuICAgICAgICAgICAgcHQ6ICdFeGlzdGVtIHJlc3RyacOnw7VlcyBuYSBmcmVxdcOqbmNpYSBkZSBncmF2YcOnw6NvIHBhcmEgZXZpdGFyIHNvYnJlY2FycmVnYXIgbyBzZXJ2acOnby4gVm9jw6ogcHJlY2lzYSBlc3BlcmFyIG1haXMge3RpbWV9JyxcbiAgICAgICAgICAgIGJnOiAn0JjQvNCwINC+0LPRgNCw0L3QuNGH0LXQvdC40Y8g0LfQsCDRh9C10YHRgtC+0YLQsNGC0LAg0L3QsCDQt9Cw0L/QuNGBLCDQt9CwINC00LAg0YHQtSDQuNC30LHQtdCz0L3QtSDQv9GA0LXRgtC+0LLQsNGA0LLQsNC90LUg0L3QsCDRg9GB0LvRg9Cz0LDRgtCwLiDQotGA0Y/QsdCy0LAg0LTQsCDQuNC30YfQsNC60LDRgtC1INC+0YnQtSB7dGltZX0nLFxuICAgICAgICAgICAgcm86ICdFeGlzdMSDIHJlc3RyaWPIm2lpIHByaXZpbmQgZnJlY3ZlbsibYSDDrm5yZWdpc3RyxINyaWxvci4gVHJlYnVpZSBzxIMgbWFpIGHImXRlcHRhyJtpIHt0aW1lfSdcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfbW9kYWxfYmVmb3JlX3VwbG9hZF9yZWNvcmRpbmdfdHh0XzE6IHtcbiAgICAgICAgICAgIHJ1OiAn0JHRg9C00YzRgtC1INC+0YDQuNCz0LDQvdCw0LvRjNC90YshJyxcbiAgICAgICAgICAgIGVuOiAnQmUgb3JpZ2luYWwhJyxcbiAgICAgICAgICAgIHVrOiAn0JHRg9C00YzRgtC1INC+0YDQuNCz0ZbQvdCw0LvRjNC90LjQvNC4IScsXG4gICAgICAgICAgICBiZTogJ9CR0YPQtNC30YzRhtC1INCw0YDRi9Cz0ZbQvdCw0LvRjNC90YvQvNGWIScsXG4gICAgICAgICAgICB6aDogJ+imgeacieWIm+aEj++8gScsXG4gICAgICAgICAgICBwdDogJ1NlamEgb3JpZ2luYWwhJyxcbiAgICAgICAgICAgIGJnOiAn0JHRitC00LXRgtC1INC+0YDQuNCz0LjQvdCw0LvQvdC4IScsXG4gICAgICAgICAgICBybzogJ0ZpaSBvcmlnaW5hbCEnXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX21vZGFsX2JlZm9yZV91cGxvYWRfcmVjb3JkaW5nX3R4dF8yOiB7XG4gICAgICAgICAgICBydTogJ9Cf0L7RhdC+0LbQtSwg0LLRiyDQt9Cw0L/QuNGB0LDQu9C4IFwi0YLQuNGC0YDRi1wiINCyINC90LDRh9Cw0LvQtSDQuNC70Lgg0LIg0LrQvtC90YbQtSDRhNC40LvRjNC80LAuINCV0YHQu9C4INGN0YLQviDRgtCw0LosINGC0L4g0L/QvtC20LDQu9GD0LnRgdGC0LAsINCy0YvQsdC10YDQuNGC0LUg0LTRgNGD0LPQvtC5INGE0YDQsNCz0LzQtdC90YIg0LLQuNC00LXQviDQtNC70Y8g0LfQsNC/0LjRgdC4LicsXG4gICAgICAgICAgICBlbjogJ0l0IGxvb2tzIGxpa2UgeW91IHJlY29yZGVkIHRoZSBcImNyZWRpdHNcIiBhdCB0aGUgYmVnaW5uaW5nIG9yIGVuZCBvZiB0aGUgbW92aWUuIElmIHNvLCBwbGVhc2UgY2hvb3NlIGFub3RoZXIgdmlkZW8gZnJhZ21lbnQgdG8gcmVjb3JkLicsXG4gICAgICAgICAgICB1azogJ9Ch0YXQvtC20LUsINCy0Lgg0LfQsNC/0LjRgdCw0LvQuCBcItGC0LjRgtGA0LhcIiDQvdCwINC/0L7Rh9Cw0YLQutGDINCw0LHQviDQsiDQutGW0L3RhtGWINGE0ZbQu9GM0LzRgy4g0K/QutGJ0L4g0YLQsNC6LCDQsdGD0LTRjCDQu9Cw0YHQutCwLCDQstC40LHQtdGA0ZbRgtGMINGW0L3RiNC40Lkg0YTRgNCw0LPQvNC10L3RgiDQstGW0LTQtdC+INC00LvRjyDQt9Cw0L/QuNGB0YMuJyxcbiAgICAgICAgICAgIGJlOiAn0J/QsNC00LDQtdGG0YbQsCwg0LLRiyDQt9Cw0L/RltGB0LDQu9GWIFwi0YLRgNGN0LnQu9C10YBcIiDQvdCwINC/0LDRh9Cw0YLQutGDINCw0LHQviDRniDQutCw0L3RhtGLINGE0ZbQu9GM0LzQsC4g0JrQsNC70ZYg0YLQsNC6LCDQutCw0LvRliDQu9Cw0YHQutCwLCDQstGL0LHQtdGA0YvRhtC1INGW0L3RiNGLINGE0YDQsNCz0LzQtdC90YIg0LLRltC00Y3QsCDQtNC70Y8g0LfQsNC/0ZbRgdGDLicsXG4gICAgICAgICAgICB6aDogJ+eci+i1t+adpeaCqOWcqOeUteW9seeahOW8gOWktOaIlue7k+WwvuW9leWItuS6huKAnOeJh+WwvuWtl+W5leKAneOAgiDlpoLmnpzmmK/ov5nmoLfvvIzor7fpgInmi6nlj6bkuIDkuKrop4bpopHniYfmrrXov5vooYzlvZXliLbjgIInLFxuICAgICAgICAgICAgcHQ6ICdQYXJlY2UgcXVlIHZvY8OqIGdyYXZvdSBvcyBcImNyw6lkaXRvc1wiIG5vIGluw61jaW8gb3Ugbm8gZmluYWwgZG8gZmlsbWUuIFNlIGZvciBlc3NlIG8gY2FzbywgZXNjb2xoYSBvdXRybyBmcmFnbWVudG8gZGUgdsOtZGVvIHBhcmEgZ3JhdmFyLicsXG4gICAgICAgICAgICBiZzogJ9CY0LfQs9C70LXQttC00LAg0YHRgtC1INC30LDQv9C40YHQsNC70LggXCLRgtC40YLRgNC40YLQtVwiINCyINC90LDRh9Cw0LvQvtGC0L4g0LjQu9C4INCyINC60YDQsNGPINC90LAg0YTQuNC70LzQsC4g0JDQutC+INC1INGC0LDQutCwLCDQvNC+0LvRjyDQuNC30LHQtdGA0LXRgtC1INC00YDRg9CzINGE0YDQsNCz0LzQtdC90YIg0L7RgiDQstC40LTQtdC+0YLQviDQt9CwINC30LDQv9C40YEuJyxcbiAgICAgICAgICAgIHJvOiAnU2UgcGFyZSBjxIMgYcibaSDDrm5yZWdpc3RyYXQg4oCeY3JlZGl0ZWxl4oCdIGxhIMOubmNlcHV0dWwgc2F1IHNmw6JyyJlpdHVsIGZpbG11bHVpLiBEYWPEgyBkYSwgdsSDIHJ1Z8SDbSBzxIMgYWxlZ2XIm2kgdW4gYWx0IGZyYWdtZW50IHZpZGVvIHBlbnRydSDDrm5yZWdpc3RyYXJlLidcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfYnV0dG9uX2Nob2ljZV9mcmFnbWVudDoge1xuICAgICAgICAgICAgcnU6ICfQktGL0LHRgNCw0YLRjCDQtNGA0YPQs9C+0Lkg0YTRgNCw0LPQvNC10L3RgicsXG4gICAgICAgICAgICBlbjogJ0Nob29zZSBhbm90aGVyIGZyYWdtZW50JyxcbiAgICAgICAgICAgIHVrOiAn0JLQuNCx0YDQsNGC0Lgg0ZbQvdGI0LjQuSDRhNGA0LDQs9C80LXQvdGCJyxcbiAgICAgICAgICAgIGJlOiAn0JLRi9Cx0YDQsNGG0Ywg0ZbQvdGI0Ysg0YTRgNCw0LPQvNC10L3RgicsXG4gICAgICAgICAgICB6aDogJ+mAieaLqeWPpuS4gOS4queJh+autScsXG4gICAgICAgICAgICBwdDogJ0VzY29saGVyIG91dHJvIGZyYWdtZW50bycsXG4gICAgICAgICAgICBiZzogJ9CY0LfQsdC10YDQuCDQtNGA0YPQsyDRhNGA0LDQs9C80LXQvdGCJyxcbiAgICAgICAgICAgIHJvOiAnQWxlZ2UgdW4gYWx0IGZyYWdtZW50J1xuICAgICAgICB9LFxuICAgICAgICBzaG90c19idXR0b25fY29udGludWVfdXBsb2FkOiB7XG4gICAgICAgICAgICBydTogJ9Cf0YDQvtC00L7Qu9C20LjRgtGMINC30LDQs9GA0YPQt9C60YMnLFxuICAgICAgICAgICAgZW46ICdDb250aW51ZSB1cGxvYWRpbmcnLFxuICAgICAgICAgICAgdWs6ICfQn9GA0L7QtNC+0LLQttC40YLQuCDQt9Cw0LLQsNC90YLQsNC20LXQvdC90Y8nLFxuICAgICAgICAgICAgYmU6ICfQn9GA0LDRhtGP0LPQvdGD0YbRjCDQt9Cw0LPRgNGD0LfQutGDJyxcbiAgICAgICAgICAgIHpoOiAn57un57ut5LiK5LygJyxcbiAgICAgICAgICAgIHB0OiAnQ29udGludWFyIGVudmlhbmRvJyxcbiAgICAgICAgICAgIGJnOiAn0J/RgNC+0LTRitC70LbQuCDQutCw0YfQstCw0L3QtdGC0L4nLFxuICAgICAgICAgICAgcm86ICdDb250aW51YcibaSDDrm5jxINyY2FyZWEnXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX3JlY29yZGluZ190ZXh0OiB7XG4gICAgICAgICAgICBydTogJ9CY0LTQtdGCINC30LDQv9C40YHRjCcsXG4gICAgICAgICAgICBlbjogJ1JlY29yZGluZyBpbiBwcm9ncmVzcycsXG4gICAgICAgICAgICB1azogJ9CZ0LTQtSDQt9Cw0L/QuNGBJyxcbiAgICAgICAgICAgIGJlOiAn0IbQtNC30LUg0LfQsNC/0ZbRgScsXG4gICAgICAgICAgICB6aDogJ+ato+WcqOW9leWIticsXG4gICAgICAgICAgICBwdDogJ0dyYXZhw6fDo28gZW0gYW5kYW1lbnRvJyxcbiAgICAgICAgICAgIGJnOiAn0JfQsNC/0LjRgdGK0YIg0LUg0LIg0YXQvtC0JyxcbiAgICAgICAgICAgIHJvOiAnw45ucmVnaXN0cmFyZSDDrm4gY3VycydcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfd2F0Y2g6IHtcbiAgICAgICAgICAgIHJ1OiAn0KHQvNC+0YLRgNC10YLRjCDQvdCw0YDQtdC30LrQuCcsXG4gICAgICAgICAgICBlbjogJ1dhdGNoIHNob3RzJyxcbiAgICAgICAgICAgIHVrOiAn0JTQuNCy0LjRgtC40YHRjyDQvdCw0YDRltC30LrQuCcsXG4gICAgICAgICAgICBiZTogJ9CT0LvRj9C00LfQtdGG0Ywg0L3QsNGA0Y3Qt9C60ZYnLFxuICAgICAgICAgICAgemg6ICfop4LnnIvniYfmrrUnLFxuICAgICAgICAgICAgcHQ6ICdBc3Npc3RpciB0cmVjaG9zJyxcbiAgICAgICAgICAgIGJnOiAn0JPQu9C10LTQsNC50YLQtSDQvdCw0YDRj9C30LrQuCcsXG4gICAgICAgICAgICBybzogJ1ZpemlvbmVhesSDIGNsaXB1cmknXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX2Rvd246IHtcbiAgICAgICAgICAgIHJ1OiAn0J3QsNC20LzQuCDQstC90LjQtycsXG4gICAgICAgICAgICBlbjogJ1ByZXNzIGRvd24nLFxuICAgICAgICAgICAgdWs6ICfQndCw0YLQuNGB0L3QuCDQstC90LjQtycsXG4gICAgICAgICAgICBiZTogJ9Cd0LDRhtGW0YHQvdGWINGe0L3RltC3JyxcbiAgICAgICAgICAgIHpoOiAn5oyJ5LiLJyxcbiAgICAgICAgICAgIHB0OiAnUHJlc3Npb25lIHBhcmEgYmFpeG8nLFxuICAgICAgICAgICAgYmc6ICfQndCw0YLQuNGB0L3QuCDQvdCw0LTQvtC70YMnLFxuICAgICAgICAgICAgcm86ICdBcGFzxIMgam9zJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c19ob3dfY3JlYXRlX3ZpZGVvX3RpdGxlOiB7XG4gICAgICAgICAgICBydTogJ9Ca0LDQuiDRgdC+0LfQtNCw0YLRjCDQstC40LTQtdC+JyxcbiAgICAgICAgICAgIGVuOiAnSG93IHRvIGNyZWF0ZSBhIHZpZGVvJyxcbiAgICAgICAgICAgIHVrOiAn0K/QuiDRgdGC0LLQvtGA0LjRgtC4INCy0ZbQtNC10L4nLFxuICAgICAgICAgICAgYmU6ICfQr9C6INGB0YLQstCw0YDRi9GG0Ywg0LLRltC00Y3QsCcsXG4gICAgICAgICAgICB6aDogJ+WmguS9leWIm+W7uuinhumikScsXG4gICAgICAgICAgICBwdDogJ0NvbW8gY3JpYXIgdW0gdsOtZGVvJyxcbiAgICAgICAgICAgIGJnOiAn0JrQsNC6INC00LAg0YHRitC30LTQsNC00LXRgtC1INCy0LjQtNC10L4nLFxuICAgICAgICAgICAgcm86ICdDdW0gc8SDIGNyZWV6aSB1biB2aWRlb2NsaXAnXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX2hvd19jcmVhdGVfdmlkZW9fc3VidGl0bGU6IHtcbiAgICAgICAgICAgIHJ1OiAn0J/QvtGB0LzQvtGC0YDQtdGC0Ywg0LjQvdGB0YLRgNGD0LrRhtC40Y4g0L/QviDRgdC+0LfQtNCw0L3QuNGOINCy0LjQtNC10L4nLFxuICAgICAgICAgICAgZW46ICdWaWV3IGluc3RydWN0aW9ucyBmb3IgY3JlYXRpbmcgYSB2aWRlbycsXG4gICAgICAgICAgICB1azogJ9Cf0LXRgNC10LPQu9GP0L3Rg9GC0Lgg0ZbQvdGB0YLRgNGD0LrRhtGW0Y4g0LfRliDRgdGC0LLQvtGA0LXQvdC90Y8g0LLRltC00LXQvicsXG4gICAgICAgICAgICBiZTogJ9Cf0LDQs9C70Y/QtNC30LXRhtGMINGW0L3RgdGC0YDRg9C60YbRltGOINC/0LAg0YHRgtCy0LDRgNGN0L3QvdGWINCy0ZbQtNGN0LAnLFxuICAgICAgICAgICAgemg6ICfmn6XnnIvliJvlu7rop4bpopHnmoTor7TmmI4nLFxuICAgICAgICAgICAgcHQ6ICdWZXIgaW5zdHJ1Y2Npb25lcyBwYXJhIGNyaWFyIHVtIHbDrWRlbycsXG4gICAgICAgICAgICBiZzogJ9CS0LjQttGC0LUg0LjQvdGB0YLRgNGD0LrRhtC40LjRgtC1INC30LAg0YHRitC30LTQsNCy0LDQvdC1INC90LAg0LLQuNC00LXQvicsXG4gICAgICAgICAgICBybzogJ1ZlemkgaW5zdHJ1Y8ibaXVuaWxlIHBlbnRydSBjcmVhcmVhIHVudWkgdmlkZW9jbGlwJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c19jYXJkX2VtcHR5X2Rlc2NyOiB7XG4gICAgICAgICAgICBydTogJ9CX0LTQtdGB0Ywg0L/QvtC60LAg0L3QtdGCINGI0L7RgtC+0LIsINC90L4g0LLRiyDQvNC+0LbQtdGC0LUg0YHQvtC30LTQsNGC0Ywg0L/QtdGA0LLRi9C5IScsXG4gICAgICAgICAgICBlbjogJ1RoZXJlIGFyZSBubyBzaG90cyBoZXJlIHlldCwgYnV0IHlvdSBjYW4gY3JlYXRlIHRoZSBmaXJzdCBvbmUhJyxcbiAgICAgICAgICAgIHVrOiAn0KLRg9GCINC/0L7QutC4INC90LXQvNCw0ZQg0YjQvtGC0ZbQsiwg0LDQu9C1INCy0Lgg0LzQvtC20LXRgtC1INGB0YLQstC+0YDQuNGC0Lgg0L/QtdGA0YjQuNC5IScsXG4gICAgICAgICAgICBiZTogJ9Ci0YPRgiDQv9Cw0LrRg9C70Ywg0L3Rj9C80LAg0YjQvtGC0LDRniwg0LDQu9C1INCy0Ysg0LzQvtC20LXRgtC1INGB0YLQstCw0YDRi9GG0Ywg0L/QtdGA0YjRiyEnLFxuICAgICAgICAgICAgemg6ICfov5nph4zov5jmsqHmnInplZzlpLTvvIzkvYbmgqjlj6/ku6XliJvlu7rnrKzkuIDkuKrvvIEnLFxuICAgICAgICAgICAgcHQ6ICdBaW5kYSBuw6NvIGjDoSB0cmVjaG9zIGFxdWksIG1hcyB2b2PDqiBwb2RlIGNyaWFyIG8gcHJpbWVpcm8hJyxcbiAgICAgICAgICAgIGJnOiAn0KLRg9C6INCy0YHQtSDQvtGJ0LUg0L3Rj9C80LAg0L3QsNGA0Y/Qt9C60LgsINC90L4g0LzQvtC20LXRgtC1INC00LAg0YHRitC30LTQsNC00LXRgtC1INC/0YrRgNCy0LjRjyEnLFxuICAgICAgICAgICAgcm86ICdOdSBleGlzdMSDIGNsaXB1cmkgYWljaSwgZGFyIHBvyJtpIHPEgy1sIGNyZWV6aSBwZSBwcmltdWwhJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c19hbGVydF9ub3Nob3RzOiB7XG4gICAgICAgICAgICBydTogJ9Co0L7RgtC+0LIg0L/QvtC60LAg0L3QtdGCJyxcbiAgICAgICAgICAgIGVuOiAnTm8gc2hvdHMgeWV0JyxcbiAgICAgICAgICAgIHVrOiAn0KjQvtGC0ZbQsiDQv9C+0LrQuCDQvdC10LzQsNGUJyxcbiAgICAgICAgICAgIGJlOiAn0KjQvtGC0LDRniDQv9Cw0LrRg9C70Ywg0L3Rj9C80LAnLFxuICAgICAgICAgICAgemg6ICfov5jmsqHmnInplZzlpLQnLFxuICAgICAgICAgICAgcHQ6ICdBaW5kYSBuw6NvIGjDoSB0cmVjaG9zJyxcbiAgICAgICAgICAgIGJnOiAn0JLRgdC1INC+0YnQtSDQvdGP0LzQsCDQvdCw0YDRj9C30LrQuCcsXG4gICAgICAgICAgICBybzogJ05pY2l1biBjbGlwIMOubmPEgydcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfY2hvaWNlX3RhZ3M6IHtcbiAgICAgICAgICAgIHJ1OiAn0JLRiyDQvNC+0LbQtdGC0LUg0LLRi9Cx0YDQsNGC0Ywg0YLQtdCz0Lg6JyxcbiAgICAgICAgICAgIGVuOiAnWW91IGNhbiBjaG9vc2UgdGFnczonLFxuICAgICAgICAgICAgdWs6ICfQktC4INC80L7QttC10YLQtSDQstC40LHRgNCw0YLQuCDRgtC10LPQuDonLFxuICAgICAgICAgICAgYmU6ICfQktGLINC80L7QttCw0YbQtSDQstGL0LHRgNCw0YbRjCDRgtGN0LPQsNGeOicsXG4gICAgICAgICAgICB6aDogJ+aCqOWPr+S7pemAieaLqeagh+etvu+8micsXG4gICAgICAgICAgICBwdDogJ1ZvY8OqIHBvZGUgZXNjb2xoZXIgdGFnczonLFxuICAgICAgICAgICAgYmc6ICfQnNC+0LbQtdGC0LUg0LTQsCDQuNC30LHQtdGA0LXRgtC1INGC0LDQs9C+0LLQtTonLFxuICAgICAgICAgICAgcm86ICdQdXRlyJtpIGFsZWdlIGV0aWNoZXRlOidcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfdGFnX2FjdGlvbjoge1xuICAgICAgICAgICAgcnU6ICfQrdC60YjQtdC9JyxcbiAgICAgICAgICAgIGVuOiAnQWN0aW9uJyxcbiAgICAgICAgICAgIHVrOiAn0JXQutGI0LXQvScsXG4gICAgICAgICAgICBiZTogJ9Ct0LrRiNC9JyxcbiAgICAgICAgICAgIHpoOiAn5Yqo5L2cJyxcbiAgICAgICAgICAgIHB0OiAnQcOnw6NvJyxcbiAgICAgICAgICAgIGJnOiAn0JXQutGI0YrQvScsXG4gICAgICAgICAgICBybzogJ0FjyJtpdW5lJ1xuICAgICAgICB9LFxuICAgICAgICBzaG90c190YWdfY29tZWR5OiB7XG4gICAgICAgICAgICBydTogJ9Cu0LzQvtGAJyxcbiAgICAgICAgICAgIGVuOiAnSHVtb3InLFxuICAgICAgICAgICAgdWs6ICfQk9GD0LzQvtGAJyxcbiAgICAgICAgICAgIGJlOiAn0JPRg9C80LDRgCcsXG4gICAgICAgICAgICB6aDogJ+W5vem7mCcsXG4gICAgICAgICAgICBwdDogJ0h1bW9yJyxcbiAgICAgICAgICAgIGJnOiAn0KXRg9C80L7RgCcsXG4gICAgICAgICAgICBybzogJ1Vtb3InXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX3RhZ19kcmFtYToge1xuICAgICAgICAgICAgcnU6ICfQlNGA0LDQvNCwJyxcbiAgICAgICAgICAgIGVuOiAnRHJhbWEnLFxuICAgICAgICAgICAgdWs6ICfQlNGA0LDQvNCwJyxcbiAgICAgICAgICAgIGJlOiAn0JTRgNCw0LzQsCcsXG4gICAgICAgICAgICB6aDogJ+aIj+WJpycsXG4gICAgICAgICAgICBwdDogJ0RyYW1hJyxcbiAgICAgICAgICAgIGJnOiAn0JTRgNCw0LzQsCcsXG4gICAgICAgICAgICBybzogJ0RyYW3EgydcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfdGFnX2hvcnJvcjoge1xuICAgICAgICAgICAgcnU6ICfQo9C20LDRgdGLJyxcbiAgICAgICAgICAgIGVuOiAnSG9ycm9yJyxcbiAgICAgICAgICAgIHVrOiAn0KPQttCw0YHQuCcsXG4gICAgICAgICAgICBiZTogJ9Cj0LbQsNGB0YsnLFxuICAgICAgICAgICAgemg6ICfmgZDmgJYnLFxuICAgICAgICAgICAgcHQ6ICdIb3Jyb3InLFxuICAgICAgICAgICAgYmc6ICfQo9C20LDRgScsXG4gICAgICAgICAgICBybzogJ0dyb2F6xIMnXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX3RhZ190aHJpbGxlcjoge1xuICAgICAgICAgICAgcnU6ICfQotGA0LjQu9C70LXRgCcsXG4gICAgICAgICAgICBlbjogJ1RocmlsbGVyJyxcbiAgICAgICAgICAgIHVrOiAn0KLRgNC40LvQtdGAJyxcbiAgICAgICAgICAgIGJlOiAn0KLRgNGL0LvQtdGAJyxcbiAgICAgICAgICAgIHpoOiAn5oOK5oKaJyxcbiAgICAgICAgICAgIHB0OiAnVGhyaWxsZXInLFxuICAgICAgICAgICAgYmc6ICfQotGA0LjQu9GK0YAnLFxuICAgICAgICAgICAgcm86ICdUaHJpbGxlcidcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfdGFnX2FuaW1lOiB7XG4gICAgICAgICAgICBydTogJ9CQ0L3QuNC80LUnLFxuICAgICAgICAgICAgZW46ICdBbmltZScsXG4gICAgICAgICAgICB1azogJ9CQ0L3RltC80LUnLFxuICAgICAgICAgICAgYmU6ICfQkNC90ZbQvNGNJyxcbiAgICAgICAgICAgIHpoOiAn5Yqo5ryrJyxcbiAgICAgICAgICAgIHB0OiAnQW5pbWUnLFxuICAgICAgICAgICAgYmc6ICfQkNC90LjQvNC1JyxcbiAgICAgICAgICAgIHJvOiAnQW5pbWUnXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX3RhZ19mYW50YXN5OiB7XG4gICAgICAgICAgICBydTogJ9Ck0Y3QvdGC0LXQt9C4JyxcbiAgICAgICAgICAgIGVuOiAnRmFudGFzeScsXG4gICAgICAgICAgICB1azogJ9Ck0LXQvdGC0LXQt9GWJyxcbiAgICAgICAgICAgIGJlOiAn0KTRjdC90YLRjdC30ZYnLFxuICAgICAgICAgICAgemg6ICflpYflubsnLFxuICAgICAgICAgICAgcHQ6ICdGYW50YXNpYScsXG4gICAgICAgICAgICBiZzogJ9Ck0LXQvdGC0YrQt9C4JyxcbiAgICAgICAgICAgIHJvOiAnRmFudGV6aWUnXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX3RhZ19zY2lfZmk6IHtcbiAgICAgICAgICAgIHJ1OiAn0KTQsNC90YLQsNGB0YLQuNC60LAnLFxuICAgICAgICAgICAgZW46ICdTY2ktRmknLFxuICAgICAgICAgICAgdWs6ICfQpNCw0L3RgtCw0YHRgtC40LrQsCcsXG4gICAgICAgICAgICBiZTogJ9Ck0LDQvdGC0LDRgdGC0YvQutCwJyxcbiAgICAgICAgICAgIHpoOiAn56eR5bm7JyxcbiAgICAgICAgICAgIHB0OiAnRmljw6fDo28gQ2llbnTDrWZpY2EnLFxuICAgICAgICAgICAgYmc6ICfQpNCw0L3RgtCw0YHRgtC40LrQsCcsXG4gICAgICAgICAgICBybzogJ0ZpY8ibaXVuZSDImHRpaW7Im2lmaWPEgydcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfc2V0dGluZ3NfaW5fcGxheWVyOiB7XG4gICAgICAgICAgICBydTogJ9Cf0L7QutCw0LfRi9Cy0LDRgtGMINC80L7QvNC10L3RgtGLINCyINC/0LvQtdC10YDQtScsXG4gICAgICAgICAgICBlbjogJ1Nob3cgbW9tZW50cyBpbiBwbGF5ZXInLFxuICAgICAgICAgICAgdWs6ICfQn9C+0LrQsNC30YPQstCw0YLQuCDQvNC+0LzQtdC90YLQuCDQsiDQv9C70LXRlNGA0ZYnLFxuICAgICAgICAgICAgYmU6ICfQn9Cw0LrQsNC30LLQsNGG0Ywg0LzQvtC80LDQvdGC0Ysg0Z4g0L/Qu9C10LXRgNGLJyxcbiAgICAgICAgICAgIHpoOiAn5Zyo5pKt5pS+5Zmo5Lit5pi+56S66ZWc5aS0JyxcbiAgICAgICAgICAgIHB0OiAnTW9zdHJhciBtb21lbnRvcyBubyBwbGF5ZXInLFxuICAgICAgICAgICAgYmc6ICfQn9C+0LrQsNC30LLQsNC90LUg0L3QsCDQvNC+0LzQtdC90YLQuCDQsiDQv9C70LXQudGK0YDQsCcsXG4gICAgICAgICAgICBybzogJ0FmaciZYcibaSBtb21lbnRlbGUgw65uIHBsYXllcicsXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX3NldHRpbmdzX2luX2NhcmQ6IHtcbiAgICAgICAgICAgIHJ1OiAn0J/QvtC60LDQt9GL0LLQsNGC0Ywg0LrQvdC+0L/QutGDIFNob3RzINCyINC60LDRgNGC0L7Rh9C60LDRhScsXG4gICAgICAgICAgICBlbjogJ1Nob3cgU2hvdHMgYnV0dG9uIGluIGNhcmRzJyxcbiAgICAgICAgICAgIHVrOiAn0J/QvtC60LDQt9GD0LLQsNGC0Lgg0LrQvdC+0L/QutGDIFNob3RzINCyINC60LDRgNGC0LrQsNGFJyxcbiAgICAgICAgICAgIGJlOiAn0J/QsNC60LDQt9Cy0LDRhtGMINC60L3QvtC/0LrRgyBTaG90cyDRgyDQutCw0YDRgtC60LDRhScsXG4gICAgICAgICAgICB6aDogJ+WcqOWNoeeJh+S4reaYvuekuiBTaG90cyDmjInpkq4nLFxuICAgICAgICAgICAgcHQ6ICdNb3N0cmFyIGJvdMOjbyBTaG90cyBlbSBjYXJ0w7VlcycsXG4gICAgICAgICAgICBiZzogJ9Cf0L7QutCw0LfQstCw0L3QtSDQvdCwINCx0YPRgtC+0L0gU2hvdHMg0LIg0LrQsNGA0YLQuNGC0LUnLFxuICAgICAgICAgICAgcm86ICdBZmnImWHIm2kgYnV0b251bCBTaG90cyDDrm4gY2FyZHVyaScsXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX3dhdGNoX3JvbGw6IHtcbiAgICAgICAgICAgIHJ1OiAn0KHQvNC+0YLRgNC10YLRjCDQu9C10L3RgtGDJyxcbiAgICAgICAgICAgIGVuOiAnV2F0Y2ggcm9sbCcsXG4gICAgICAgICAgICB1azogJ9CU0LjQstC40YLQuNGB0Y8g0YHRgtGA0ZbRh9C60YMnLFxuICAgICAgICAgICAgYmU6ICfQk9C70Y/QtNC30LXRhtGMINGB0YLRg9C20LrRgycsXG4gICAgICAgICAgICB6aDogJ+ingueci+WNtycsXG4gICAgICAgICAgICBwdDogJ0Fzc2lzdGlyIHJvbG8nLFxuICAgICAgICAgICAgYmc6ICfQk9C70LXQtNCw0LnRgtC1INGA0L7Qu9C60LAnLFxuICAgICAgICAgICAgcm86ICdWaXppb25hyJtpIHJ1bG91bCcsXG4gICAgICAgIH0sXG4gICAgICAgIHNob3RzX2Nob29zZV90YWdzX3NlbGVjdDoge1xuICAgICAgICAgICAgcnU6ICfQmNC70Lgg0LLRi9Cx0LXRgNC40YLQtSDRgtC10LPQuCcsXG4gICAgICAgICAgICBlbjogJ09yIGNob29zZSB0YWdzJyxcbiAgICAgICAgICAgIHVrOiAn0JDQsdC+INCy0LjQsdC10YDRltGC0Ywg0YLQtdCz0LgnLFxuICAgICAgICAgICAgYmU6ICfQkNCx0L4g0LLRi9Cx0LXRgNC40YLQtSDRgtC10LPQuCcsXG4gICAgICAgICAgICB6aDogJ+aIluiAhemAieaLqeagh+etvicsXG4gICAgICAgICAgICBwdDogJ091IGVzY29saGEgdGFncycsXG4gICAgICAgICAgICBiZzogJ9CY0LvQuCDQstGL0LHQtdGA0LjRgtC1INGC0LXQs9C4JyxcbiAgICAgICAgICAgIHJvOiAnU2F1IGFsZWdlyJtpIGV0aWNoZXRlJyxcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfd2F0Y2hfdGFnczoge1xuICAgICAgICAgICAgcnU6ICfQodC80L7RgtGA0LXRgtGMINC/0L4g0YLQtdCz0LDQvCcsXG4gICAgICAgICAgICBlbjogJ1dhdGNoIGJ5IHRhZ3MnLFxuICAgICAgICAgICAgdWs6ICfQlNC40LLQuNGC0LjRgdGPINC30LAg0YLQtdCz0LDQvNC4JyxcbiAgICAgICAgICAgIGJlOiAn0JPQu9GP0LTQt9C10YbRjCDQv9CwINGC0Y3Qs9Cw0YUnLFxuICAgICAgICAgICAgemg6ICfmjInmoIfnrb7op4LnnIsnLFxuICAgICAgICAgICAgcHQ6ICdBc3Npc3RpciBwb3IgdGFncycsXG4gICAgICAgICAgICBiZzogJ9CT0LvQtdC00LDQudGC0LUg0L/QviDRgtCw0LPQvtCy0LUnLFxuICAgICAgICAgICAgcm86ICdWaXppb25hyJtpIGR1cMSDIGV0aWNoZXRlJyxcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfYWxlcnRfbm9fdGFnczoge1xuICAgICAgICAgICAgcnU6ICfQktGL0LHQtdGA0LjRgtC1INGF0L7RgtGPINCx0Ysg0L7QtNC40L0g0YLQtdCzJyxcbiAgICAgICAgICAgIGVuOiAnUGxlYXNlIHNlbGVjdCBhdCBsZWFzdCBvbmUgdGFnJyxcbiAgICAgICAgICAgIHVrOiAn0JHRg9C00Ywg0LvQsNGB0LrQsCwg0LLQuNCx0LXRgNGW0YLRjCDRhdC+0YfQsCDQsSDQvtC00LjQvSDRgtC10LMnLFxuICAgICAgICAgICAgYmU6ICfQmtCw0LvRliDQu9Cw0YHQutCwLCDQstGL0LHQtdGA0YvRhtC1INGF0LDRhtGPINCxINCw0LTQt9GW0L0g0YLRjdCzJyxcbiAgICAgICAgICAgIHpoOiAn6K+36Iez5bCR6YCJ5oup5LiA5Liq5qCH562+JyxcbiAgICAgICAgICAgIHB0OiAnUG9yIGZhdm9yLCBzZWxlY2lvbmUgcGVsbyBtZW5vcyB1bWEgdGFnJyxcbiAgICAgICAgICAgIGJnOiAn0JzQvtC70Y8sINC40LfQsdC10YDQtdGC0LUg0L/QvtC90LUg0LXQtNC40L0g0YLQsNCzJyxcbiAgICAgICAgICAgIHJvOiAnVsSDIHJ1Z8SDbSBzxIMgc2VsZWN0YcibaSBjZWwgcHXIm2luIHVuIGV0aWNoZXRhJyxcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfcGxheWVyX3JlY29yZGVyX3Jld2luZF90ZXh0OiB7XG4gICAgICAgICAgICBydTogJ9Cf0LXRgNC10LzQvtGC0LDRgtGMINC90LDQt9Cw0LQnLFxuICAgICAgICAgICAgZW46ICdSZXdpbmQnLFxuICAgICAgICAgICAgdWs6ICfQn9C10YDQtdC80L7RgtCw0YLQuCDQvdCw0LfQsNC0JyxcbiAgICAgICAgICAgIGJlOiAn0J/QtdGA0LDQvNCw0YLQsNGG0Ywg0L3QsNC30LDQtCcsXG4gICAgICAgICAgICB6aDogJ+WAkuW4picsXG4gICAgICAgICAgICBwdDogJ1JlYm9iaW5hcicsXG4gICAgICAgICAgICBiZzogJ9CS0YrRgNC90Lgg0L3QsNC30LDQtCcsXG4gICAgICAgICAgICBybzogJ0RlcnVsYcibaSDDrm5hcG9pJyxcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfcGxheWVyX3JlY29yZGVyX2ZvcndhcmRfdGV4dDoge1xuICAgICAgICAgICAgcnU6ICfQn9C10YDQtdC80L7RgtCw0YLRjCDQstC/0LXRgNC10LQnLFxuICAgICAgICAgICAgZW46ICdGYXN0IGZvcndhcmQnLFxuICAgICAgICAgICAgdWs6ICfQn9C10YDQtdC80L7RgtCw0YLQuCDQstC/0LXRgNC10LQnLFxuICAgICAgICAgICAgYmU6ICfQn9C10YDQsNC80LDRgtCw0YbRjCDQvdCw0L/QtdGA0LDQtCcsXG4gICAgICAgICAgICB6aDogJ+W/q+i/mycsXG4gICAgICAgICAgICBwdDogJ0F2YW7Dp2FyJyxcbiAgICAgICAgICAgIGJnOiAn0J3QsNC/0YDQtdC0JyxcbiAgICAgICAgICAgIHJvOiAnRGVydWxhyJtpIMOubmFpbnRlJyxcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdHNfcGxheWVyX3JlY29yZGVyX3N0b3BfdGV4dDoge1xuICAgICAgICAgICAgcnU6ICfQntGB0YLQsNC90L7QstC40YLRjCDQt9Cw0L/QuNGB0YwnLFxuICAgICAgICAgICAgZW46ICdTdG9wIHJlY29yZGluZycsXG4gICAgICAgICAgICB1azogJ9CX0YPQv9C40L3QuNGC0Lgg0LfQsNC/0LjRgScsXG4gICAgICAgICAgICBiZTogJ9Ch0L/Ri9C90ZbRhtGMINC30LDQv9GW0YEnLFxuICAgICAgICAgICAgemg6ICflgZzmraLlvZXliLYnLFxuICAgICAgICAgICAgcHQ6ICdQYXJhciBncmF2YcOnw6NvJyxcbiAgICAgICAgICAgIGJnOiAn0KHQv9C40YDQsNC90LUg0L3QsCDQt9Cw0L/QuNGB0LAnLFxuICAgICAgICAgICAgcm86ICdPcHJpyJtpIMOubnJlZ2lzdHJhcmVhJyxcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0XG59XG4iLCJmdW5jdGlvbiBpbml0KCl7XG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdzaG90c19wbGF5ZXJfcmVjb3JkX2J1dHRvbicsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiBzZWxlY3RvciBzaG90cy1wbGF5ZXItYnV0dG9uXCIgZGF0YS1jb250cm9sbGVyPVwicGxheWVyX3BhbmVsXCI+XG4gICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTEuNzE4XCIgY3k9XCIxMS43MThcIiByPVwiMTAuNzE4XCIgc3Ryb2tlPVwid2hpdGVcIiBzdHJva2Utd2lkdGg9XCIyXCIvPlxuICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIxMS43MThcIiBjeT1cIjExLjcxOFwiIHI9XCI1LjkyNjIxXCIgZmlsbD1cIndoaXRlXCIgY2xhc3M9XCJyZWNcIi8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgYClcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnc2hvdHNfbW9kYWxfYmVmb3JlX3JlY29yZGluZycsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImFib3V0XCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAxLjJlbTtcIj5cbiAgICAgICAgICAgICAgICAje3Nob3RzX21vZGFsX2JlZm9yZV9yZWNvcmRpbmdfdHh0XzF9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cInNob3RzLXN2Zy1hdXRvIHNob3RzLXN2Zy1hdXRvLS1oZWxtZXRcIj48dXNlIHhsaW5rOmhyZWY9XCIjc3ByaXRlLXNob3RzLWhvd25lZWRcIj48L3VzZT48L3N2Zz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAje3Nob3RzX21vZGFsX2JlZm9yZV9yZWNvcmRpbmdfdHh0XzJ9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYClcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnc2hvdHNfbW9kYWxfYmVmb3JlX3VwbG9hZF9yZWNvcmRpbmcnLCBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhYm91dFwiPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogMS4yZW07XCI+XG4gICAgICAgICAgICAgICAgI3tzaG90c19tb2RhbF9iZWZvcmVfdXBsb2FkX3JlY29yZGluZ190eHRfMX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwic2hvdHMtc3ZnLWF1dG8gc2hvdHMtc3ZnLWF1dG8tLWhlbG1ldFwiPjx1c2UgeGxpbms6aHJlZj1cIiNzcHJpdGUtc2hvdHMtbm90aXRsZXNcIj48L3VzZT48L3N2Zz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAje3Nob3RzX21vZGFsX2JlZm9yZV91cGxvYWRfcmVjb3JkaW5nX3R4dF8yfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ3Nob3RzX21vZGFsX2Vycm9yX3JlY29yZGluZycsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImFib3V0XCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAxLjJlbTtcIj5cbiAgICAgICAgICAgICAgICAje3Nob3RzX21vZGFsX2Vycm9yX3JlY29yZGluZ190eHRfMX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAje3Nob3RzX21vZGFsX2Vycm9yX3JlY29yZGluZ190eHRfMn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdzaG90c19tb2RhbF9yZXBvcnQnLCBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhYm91dFwiPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogMS4yZW07XCI+XG4gICAgICAgICAgICAgICAgI3tzaG90c19tb2RhbF9yZXBvcnRfdHh0XzF9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgI3tzaG90c19tb2RhbF9yZXBvcnRfdHh0XzJ9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgI3tzaG90c19tb2RhbF9yZXBvcnRfdHh0XzN9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYClcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnc2hvdHNfbW9kYWxfZGVsZXRlJywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWJvdXRcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDEuMmVtO1wiPlxuICAgICAgICAgICAgICAgICN7c2hvdHNfbW9kYWxfZGVsZXRlX3R4dF8xfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICN7c2hvdHNfbW9kYWxfZGVsZXRlX3R4dF8yfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ3Nob3RzX21vZGFsX3F1b3RhX2xpbWl0JywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWJvdXRcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDEuMmVtO1wiPlxuICAgICAgICAgICAgICAgICN7c2hvdHNfbW9kYWxfcXVvdGFfdHh0XzF9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgI3tzaG90c19tb2RhbF9xdW90YV90eHRfMn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdzaG90c19tb2RhbF9zaG9ydF9yZWNvcmRpbmcnLCBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhYm91dFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAje3Nob3RzX21vZGFsX3Nob3J0X3JlY29yZGluZ190eHR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYClcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnc2hvdHNfcGxheWVyX3JlY29yZGVyJywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwic2hvdHMtcGxheWVyLXJlY29yZGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2hvdHMtcGxheWVyLXJlY29yZGVyX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLXBsYXllci1yZWNvcmRlcl9fcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLXBsYXllci1yZWNvcmRlcl9fdGV4dFwiPiN7c2hvdHNfcmVjb3JkaW5nX3RleHR9IDxzcGFuPjwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLXBsYXllci1yZWNvcmRlcl9fYnV0dG9uIHNlbGVjdG9yIHNob3RzLXBsYXllci1yZWNvcmRlcl9fcmV3aW5kXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMzVcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMzUgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE0Ljc1IDEwLjIzMDJDMTMuNDE2NyAxMSAxMy40MTY3IDEyLjkyNDUgMTQuNzUgMTMuNjk0M0wzMiAyMy42NTM2QzMzLjMzMzMgMjQuNDIzNCAzNSAyMy40NjEyIDM1IDIxLjkyMTZMMzUgMi4wMDI5OEMzNSAwLjQ2MzM4MSAzMy4zMzMzIC0wLjQ5ODg2NyAzMiAwLjI3MDkzM0wxNC43NSAxMC4yMzAyWlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xLjc1IDEwLjIzMDJDMC40MTY2NjUgMTEgMC40MTY2NjcgMTIuOTI0NSAxLjc1IDEzLjY5NDNMMTkgMjMuNjUzNkMyMC4zMzMzIDI0LjQyMzQgMjIgMjMuNDYxMiAyMiAyMS45MjE2TDIyIDIuMDAyOThDMjIgMC40NjMzODEgMjAuMzMzMyAtMC40OTg4NjcgMTkgMC4yNzA5MzNMMS43NSAxMC4yMzAyWlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCI2XCIgaGVpZ2h0PVwiMjRcIiByeD1cIjJcIiB0cmFuc2Zvcm09XCJtYXRyaXgoLTEgMCAwIDEgNiAwKVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+I3tzaG90c19wbGF5ZXJfcmVjb3JkZXJfcmV3aW5kX3RleHR9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2hvdHMtcGxheWVyLXJlY29yZGVyX19idXR0b24gc2VsZWN0b3Igc2hvdHMtcGxheWVyLXJlY29yZGVyX19mb3J3YXJkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMzVcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMzUgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTIwLjI1IDEwLjIzMDJDMjEuNTgzMyAxMSAyMS41ODMzIDEyLjkyNDUgMjAuMjUgMTMuNjk0M0wzIDIzLjY1MzZDMS42NjY2NiAyNC40MjM0IC02LjcyOTgxZS0wOCAyMy40NjEyIDAgMjEuOTIxNkw4LjcwNjY5ZS0wNyAyLjAwMjk4QzkuMzc5NjdlLTA3IDAuNDYzMzgxIDEuNjY2NjcgLTAuNDk4ODY3IDMgMC4yNzA5MzNMMjAuMjUgMTAuMjMwMlpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMzMuMjUgMTAuMjMwMkMzNC41ODMzIDExIDM0LjU4MzMgMTIuOTI0NSAzMy4yNSAxMy42OTQzTDE2IDIzLjY1MzZDMTQuNjY2NyAyNC40MjM0IDEzIDIzLjQ2MTIgMTMgMjEuOTIxNkwxMyAyLjAwMjk4QzEzIDAuNDYzMzgxIDE0LjY2NjcgLTAuNDk4ODY3IDE2IDAuMjcwOTMzTDMzLjI1IDEwLjIzMDJaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCB4PVwiMjlcIiB3aWR0aD1cIjZcIiBoZWlnaHQ9XCIyNFwiIHJ4PVwiMlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+I3tzaG90c19wbGF5ZXJfcmVjb3JkZXJfZm9yd2FyZF90ZXh0fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLXBsYXllci1yZWNvcmRlcl9fYnV0dG9uIHNlbGVjdG9yIHNob3RzLXBsYXllci1yZWNvcmRlcl9fc3RvcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjE5XCIgaGVpZ2h0PVwiMjVcIiB2aWV3Qm94PVwiMCAwIDE5IDI1XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCI2XCIgaGVpZ2h0PVwiMjVcIiByeD1cIjJcIiBmaWxsPVwiY3VycmVudENvbG9yXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIxM1wiIHdpZHRoPVwiNlwiIGhlaWdodD1cIjI1XCIgcng9XCIyXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj4je3Nob3RzX3BsYXllcl9yZWNvcmRlcl9zdG9wX3RleHR9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ3Nob3RzX21vZGFsX3VwbG9hZCcsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLW1vZGFsLXVwbG9hZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLW1vZGFsLXVwbG9hZF9fcHJldmlld1wiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLW1vZGFsLXVwbG9hZF9fYm9keVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdzaG90c19jaGVja2JveCcsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLXNlbGVjdG9yIHNob3RzLWNoZWNrYm94IHNlbGVjdG9yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2hvdHMtY2hlY2tib3hfX2ljb25cIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaG90cy1jaGVja2JveF9fdGV4dFwiPnt0ZXh0fTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdzaG90c19idXR0b24nLCBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzaG90cy1zZWxlY3RvciBzaG90cy1idXR0b24gc2VsZWN0b3JcIj57dGV4dH08L2Rpdj5cbiAgICBgKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdzaG90c19wcm9ncmVzcycsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLXNlbGVjdG9yIHNob3RzLXByb2dyZXNzIHNlbGVjdG9yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2hvdHMtcHJvZ3Jlc3NfX3RleHRcIj57dGV4dH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaG90cy1wcm9ncmVzc19fYmFyXCI+PGRpdj48L2Rpdj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYClcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnc2hvdHNfcHJldmlldycsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLXByZXZpZXdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaG90cy1wcmV2aWV3X19sZWZ0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLXByZXZpZXdfX3NjcmVlbnNob3RcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLXByZXZpZXdfX2JvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2hvdHMtcHJldmlld19feWVhclwiPnt5ZWFyfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaG90cy1wcmV2aWV3X190aXRsZVwiPnt0aXRsZX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdzaG90c190YWdzJywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwic2hvdHMtdGFnc1wiPjwvZGl2PlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ3Nob3RzX3VwbG9hZF9jb21wbGV0ZV90ZXh0JywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWJvdXRcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJwYWRkaW5nLWJvdHRvbTogMWVtO1wiPlxuICAgICAgICAgICAgICAgICN7c2hvdHNfdXBsb2FkX2NvbXBsZXRlX3RleHR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYClcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnc2hvdHNfdXBsb2FkX25vdGljZV90ZXh0JywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWJvdXRcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJwYWRkaW5nLWJvdHRvbTogMWVtO1wiPlxuICAgICAgICAgICAgICAgICN7c2hvdHNfdXBsb2FkX25vdGljZV90ZXh0fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ3Nob3RzX2xlbnRhJywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwic2hvdHMtbGVudGFcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaG90cy1sZW50YV9fdmlkZW9cIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaG90cy1sZW50YV9fcGFuZWxcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYClcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnc2hvdHNfbGVudGFfdmlkZW8nLCBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzaG90cy1sZW50YS12aWRlb1wiPlxuICAgICAgICAgICAgPHZpZGVvIGNsYXNzPVwic2hvdHMtbGVudGEtdmlkZW9fX3ZpZGVvLWVsZW1lbnRcIiBhdXRvcGxheSBsb29wIHBvc3Rlcj1cIi4vaW1nL3ZpZGVvX3Bvc3Rlci5wbmdcIj48L3ZpZGVvPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLWxlbnRhLXZpZGVvX19wcm9ncmVzcy1iYXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxheWVyLXZpZGVvX19sb2FkZXIgc2hvdHMtbGVudGEtdmlkZW9fX2xvYWRlclwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLWxlbnRhLXZpZGVvX19sYXllclwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuXG4gICAgTGFtcGEuVGVtcGxhdGUuYWRkKCdzaG90c19sZW50YV9wYW5lbCcsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLWxlbnRhLXBhbmVsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXhwbG9yZXItY2FyZF9faGVhZCBzaG90cy1sZW50YS1wYW5lbF9fY2FyZCBsb2FkaW5nXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImV4cGxvcmVyLWNhcmRfX2hlYWQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXhwbG9yZXItY2FyZF9faGVhZC1pbWcgc2VsZWN0b3Igc2hvdHMtbGVudGEtcGFuZWxfX2NhcmQtaW1nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXhwbG9yZXItY2FyZF9faGVhZC1ib2R5IHNlbGVjdG9yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaG90cy1sZW50YS1wYW5lbF9faW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImV4cGxvcmVyLWNhcmRfX2hlYWQtY3JlYXRlIHNob3RzLWxlbnRhLXBhbmVsX19jYXJkLXllYXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaG90cy1sZW50YS1wYW5lbF9fY2FyZC10aXRsZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLWxlbnRhLXBhbmVsX19yZWNvcmRlciBoaWRlXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2hvdHMtbGVudGEtcGFuZWxfX3RhZ3NcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLWxlbnRhLXBhbmVsX19yaWdodFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaG90cy1sZW50YS1wYW5lbF9fYXV0aG9yXCI+PC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2hvdHMtbGVudGEtcGFuZWxfX2J1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdG9yIGFjdGlvbi1saWtlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjM5XCIgaGVpZ2h0PVwiMzVcIiB2aWV3Qm94PVwiMCAwIDM5IDM1XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0yNi42NTA0IDEuNTA5NzdDMjkuMjYxNyAxLjM4NTk3IDMyLjIwMzYgMi4zNjcwNSAzNC43MTY4IDUuNDI2NzZDMzcuMTU2NyA4LjM5NzM3IDM3LjE1NzYgMTEuMzYyNSAzNi4yMTQ4IDE0LjAwMkMzNS4yNDA4IDE2LjcyODggMzMuMjUzOCAxOS4wNzA1IDMxLjgzNCAyMC40MjM4QzMxLjgyOTUgMjAuNDI4MSAzMS44MjQ3IDIwLjQzMjIgMzEuODIwMyAyMC40MzY1TDE5LjE0ODQgMzIuODI3MUw2LjQ3NzU0IDIwLjQzNjVDNS4wMzA5OSAxOC45ODQ3IDMuMDUzIDE2LjY0NiAyLjA4MjAzIDEzLjk0NDNDMS4xNDE4MyAxMS4zMjgyIDEuMTM5MzggOC4zOTk1OSAzLjU4MTA1IDUuNDI2NzZDNi4wOTQyOSAyLjM2NzA1IDkuMDM2MTMgMS4zODU5NyAxMS42NDc1IDEuNTA5NzdDMTQuMzI5OSAxLjYzNjkzIDE2LjcwNDQgMi45Mjk5NyAxNy45OTMyIDQuNDg3M0MxOC4yNzgxIDQuODMxNjcgMTguNzAyNCA1LjAzMTI1IDE5LjE0OTQgNS4wMzEyNUMxOS41OTYyIDUuMDMxMTMgMjAuMDE5OCA0LjgzMTU3IDIwLjMwNDcgNC40ODczQzIxLjU5MzQgMi45Mjk5NyAyMy45NjggMS42MzY5NyAyNi42NTA0IDEuNTA5NzdaXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiM1wiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGNsYXNzPVwiaWNvbi1maWxsXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0b3IgYWN0aW9uLWZhdm9yaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjFcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgMjEgMzJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTIgMS41SDE5QzE5LjI3NjEgMS41IDE5LjUgMS43MjM4NiAxOS41IDJWMjcuOTYxOEMxOS41IDI4LjM3NTYgMTkuMDI2MSAyOC42MTAzIDE4LjY5NyAyOC4zNTk1TDEyLjYyMTIgMjMuNzMwM0MxMS4zNjgyIDIyLjc3NTcgOS42MzE4MyAyMi43NzU3IDguMzc4ODUgMjMuNzMwM0wyLjMwMzAyIDI4LjM1OTVDMS45NzM5IDI4LjYxMDMgMS41IDI4LjM3NTYgMS41IDI3Ljk2MThWMkMxLjUgMS43MjM4NiAxLjcyMzg2IDEuNSAyIDEuNVpcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyLjVcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgY2xhc3M9XCJpY29uLWZpbGxcIj48L3BhdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3RvciBhY3Rpb24tbW9yZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN2Zz48dXNlIHhsaW5rOmhyZWY9XCIjc3ByaXRlLWRvdHNcIj48L3VzZT48L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYClcblxuICAgIExhbXBhLlRlbXBsYXRlLmFkZCgnc2hvdHNfY291bnRlcicsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLWNvdW50ZXJcIj5cbiAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApXG5cbiAgICBMYW1wYS5UZW1wbGF0ZS5hZGQoJ3Nob3RzX2F1dGhvcicsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLWF1dGhvclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLWF1dGhvcl9faW1nXCI+XG4gICAgICAgICAgICAgICAgPGltZz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLWF1dGhvcl9fbmFtZVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKVxuXG4gICAgbGV0IHNwcml0ZXMgPSAgYFxuICAgICAgICA8c3ltYm9sIGlkPVwic3ByaXRlLWxvdmVcIiB2aWV3Qm94PVwiMCAwIDM5IDM1XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTI2LjY1MDQgMS41MDk3N0MyOS4yNjE3IDEuMzg1OTcgMzIuMjAzNiAyLjM2NzA1IDM0LjcxNjggNS40MjY3NkMzNy4xNTY3IDguMzk3MzcgMzcuMTU3NiAxMS4zNjI1IDM2LjIxNDggMTQuMDAyQzM1LjI0MDggMTYuNzI4OCAzMy4yNTM4IDE5LjA3MDUgMzEuODM0IDIwLjQyMzhDMzEuODI5NSAyMC40MjgxIDMxLjgyNDcgMjAuNDMyMiAzMS44MjAzIDIwLjQzNjVMMTkuMTQ4NCAzMi44MjcxTDYuNDc3NTQgMjAuNDM2NUM1LjAzMDk5IDE4Ljk4NDcgMy4wNTMgMTYuNjQ2IDIuMDgyMDMgMTMuOTQ0M0MxLjE0MTgzIDExLjMyODIgMS4xMzkzOCA4LjM5OTU5IDMuNTgxMDUgNS40MjY3NkM2LjA5NDI5IDIuMzY3MDUgOS4wMzYxMyAxLjM4NTk3IDExLjY0NzUgMS41MDk3N0MxNC4zMjk5IDEuNjM2OTMgMTYuNzA0NCAyLjkyOTk3IDE3Ljk5MzIgNC40ODczQzE4LjI3ODEgNC44MzE2NyAxOC43MDI0IDUuMDMxMjUgMTkuMTQ5NCA1LjAzMTI1QzE5LjU5NjIgNS4wMzExMyAyMC4wMTk4IDQuODMxNTcgMjAuMzA0NyA0LjQ4NzNDMjEuNTkzNCAyLjkyOTk3IDIzLjk2OCAxLjYzNjk3IDI2LjY1MDQgMS41MDk3N1pcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIzXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG4gICAgICAgIDwvc3ltYm9sPlxuXG4gICAgICAgIDxzeW1ib2wgaWQ9XCJzcHJpdGUtc2hvdHNcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjUzLjI2NiA1MTJhMTkuMTY2IDE5LjE2NiAwIDAgMS0xOS4xNjgtMTkuMTY4VjMzMC42MDdsLTEzNS4wNzEtLjA0OWExOS4xNjQgMTkuMTY0IDAgMCAxLTE2LjgzMi0yOC4zMkwyNDEuMDYgMTAuMDEzYTE5LjE2NyAxOS4xNjcgMCAwIDEgMzYuMDA1IDkuMTU0djE2Mi41MzRoMTM1LjkwMmExOS4xNjcgMTkuMTY3IDAgMCAxIDE2LjgxNSAyOC4zNjNMMjcwLjA3OCA1MDIuMDNhMTkuMTczIDE5LjE3MyAwIDAgMS0xNi44MTIgOS45N3pcIiBmaWxsPVwiY3VycmVudENvbG9yXCI+PC9wYXRoPlxuICAgICAgICA8L3N5bWJvbD5cblxuICAgICAgICA8c3ltYm9sIGlkPVwic3ByaXRlLXNob3RzLW5vdGl0bGVzXCIgdmlld0JveD1cIjAgMCA0NzQgMTM4XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICA8cmVjdCB4PVwiMS41XCIgeT1cIjEuNVwiIHdpZHRoPVwiMjE2LjE5NlwiIGhlaWdodD1cIjEyMS4zMDlcIiByeD1cIjkuNVwiIHN0cm9rZT1cIndoaXRlXCIgc3Ryb2tlLXdpZHRoPVwiM1wiLz5cbiAgICAgICAgICAgIDxyZWN0IHg9XCIyNTUuNDlcIiB5PVwiMS41XCIgd2lkdGg9XCIyMTYuMTk2XCIgaGVpZ2h0PVwiMTIxLjMwOVwiIHJ4PVwiOS41XCIgc3Ryb2tlPVwid2hpdGVcIiBzdHJva2Utd2lkdGg9XCIzXCIvPlxuICAgICAgICAgICAgPHJlY3QgeD1cIjc3Ljk2OTJcIiB5PVwiNDkuNjI4OVwiIHdpZHRoPVwiNjMuMjU4MVwiIGhlaWdodD1cIjUuMTQ4OTFcIiByeD1cIjIuNTc0NDZcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICA8cmVjdCB4PVwiNTEuNDM0OFwiIHk9XCI2NC44MTU2XCIgd2lkdGg9XCIxMTYuMzI3XCIgaGVpZ2h0PVwiNS4xNDg5MVwiIHJ4PVwiMi41NzQ0NlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgIDxyZWN0IHg9XCIzMDIuODEzXCIgeT1cIjI3Ljg5MTlcIiB3aWR0aD1cIjU4LjA3NzRcIiBoZWlnaHQ9XCI1LjE0ODkxXCIgcng9XCIyLjU3NDQ2XCIgZmlsbD1cIndoaXRlXCIvPlxuICAgICAgICAgICAgPHJlY3QgeD1cIjM0NS40ODVcIiB5PVwiMTAuMTkzOFwiIHdpZHRoPVwiMzYuMjA2OFwiIGhlaWdodD1cIjUuMTQ4OTFcIiByeD1cIjIuNTc0NDZcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICA8cmVjdCB4PVwiMzE5LjMzNlwiIHk9XCI0NC4xMDY5XCIgd2lkdGg9XCI0MS41NTQyXCIgaGVpZ2h0PVwiNS4xNDg5MVwiIHJ4PVwiMi41NzQ0NlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgIDxyZWN0IHg9XCIzMTIuNzUxXCIgeT1cIjYwLjMyMTlcIiB3aWR0aD1cIjQ4LjEzOTRcIiBoZWlnaHQ9XCI1LjE0ODkxXCIgcng9XCIyLjU3NDQ2XCIgZmlsbD1cIndoaXRlXCIvPlxuICAgICAgICAgICAgPHJlY3Qgb3BhY2l0eT1cIjAuNjZcIiB4PVwiMzE2LjI1XCIgeT1cIjc2LjUzNjhcIiB3aWR0aD1cIjQ0LjY0MTFcIiBoZWlnaHQ9XCI1LjE0ODkxXCIgcng9XCIyLjU3NDQ2XCIgZmlsbD1cIndoaXRlXCIvPlxuICAgICAgICAgICAgPHJlY3Qgb3BhY2l0eT1cIjAuMzhcIiB4PVwiMzQyLjM4NVwiIHk9XCI5Mi43NTE3XCIgd2lkdGg9XCIxOC41MDU0XCIgaGVpZ2h0PVwiNS4xNDg5MVwiIHJ4PVwiMi41NzQ0NlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgIDxyZWN0IG9wYWNpdHk9XCIwLjI4XCIgeD1cIjMwOC40MjlcIiB5PVwiMTA4Ljk2N1wiIHdpZHRoPVwiNTIuNDYxMlwiIGhlaWdodD1cIjQuMDQyNjZcIiByeD1cIjIuMDIxMzNcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICA8cmVjdCB4PVwiMzcxLjExM1wiIHk9XCIyNy44OTE5XCIgd2lkdGg9XCIzOC4yMTI5XCIgaGVpZ2h0PVwiNS4xNDg5MVwiIHJ4PVwiMi41NzQ0NlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgIDxyZWN0IHg9XCIzNzEuMTEzXCIgeT1cIjQ0LjEwNjlcIiB3aWR0aD1cIjQ3LjgyNjdcIiBoZWlnaHQ9XCI1LjE0ODkxXCIgcng9XCIyLjU3NDQ2XCIgZmlsbD1cIndoaXRlXCIvPlxuICAgICAgICAgICAgPHJlY3QgeD1cIjM3MS4xMTNcIiB5PVwiNjAuMzIxOVwiIHdpZHRoPVwiMjkuMzA1NFwiIGhlaWdodD1cIjUuMTQ4OTFcIiByeD1cIjIuNTc0NDZcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICA8cmVjdCBvcGFjaXR5PVwiMC42NlwiIHg9XCIzNzEuMTEzXCIgeT1cIjc2LjUzNjhcIiB3aWR0aD1cIjQ0LjMyODFcIiBoZWlnaHQ9XCI1LjE0ODkxXCIgcng9XCIyLjU3NDQ2XCIgZmlsbD1cIndoaXRlXCIvPlxuICAgICAgICAgICAgPHJlY3Qgb3BhY2l0eT1cIjAuMzhcIiB4PVwiMzcxLjExM1wiIHk9XCI5Mi43NTE3XCIgd2lkdGg9XCIyOS4zMDU0XCIgaGVpZ2h0PVwiNS4xNDg5MVwiIHJ4PVwiMi41NzQ0NlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgIDxyZWN0IG9wYWNpdHk9XCIwLjI4XCIgeD1cIjM3MS4xMTNcIiB5PVwiMTA4Ljk2N1wiIHdpZHRoPVwiMzAuOTUxN1wiIGhlaWdodD1cIjUuMTQ4OTFcIiByeD1cIjIuNTc0NDZcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICA8cmVjdCB4PVwiOTkuMDAxXCIgeT1cIjgwLjAwMjVcIiB3aWR0aD1cIjIxLjE5NDZcIiBoZWlnaHQ9XCI1LjE0ODkxXCIgcng9XCIyLjU3NDQ2XCIgZmlsbD1cIndoaXRlXCIvPlxuICAgICAgICAgICAgPHJlY3QgeD1cIjE2OS4xNjhcIiB5PVwiODguNjg2OVwiIHdpZHRoPVwiNjIuNTA2NFwiIGhlaWdodD1cIjYuMjg3NjJcIiByeD1cIjMuMTQzODFcIiB0cmFuc2Zvcm09XCJyb3RhdGUoNDUgMTY5LjE2OCA4OC42ODY5KVwiIGZpbGw9XCIjRkYzRjNGXCIvPlxuICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCI2Mi41MDY0XCIgaGVpZ2h0PVwiNi4yODc2MlwiIHJ4PVwiMy4xNDM4MVwiIHRyYW5zZm9ybT1cIm1hdHJpeCgtMC43MDcxMDcgMC43MDcxMDcgMC43MDcxMDcgMC43MDcxMDcgMjA4LjkyMSA4OC42ODY5KVwiIGZpbGw9XCIjRkYzRjNGXCIvPlxuICAgICAgICAgICAgPHJlY3QgeD1cIjQyMy4zODZcIiB5PVwiODguNjg2OVwiIHdpZHRoPVwiNjIuNTA2NFwiIGhlaWdodD1cIjYuMjg3NjJcIiByeD1cIjMuMTQzODFcIiB0cmFuc2Zvcm09XCJyb3RhdGUoNDUgNDIzLjM4NiA4OC42ODY5KVwiIGZpbGw9XCIjRkYzRjNGXCIvPlxuICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCI2Mi41MDY0XCIgaGVpZ2h0PVwiNi4yODc2MlwiIHJ4PVwiMy4xNDM4MVwiIHRyYW5zZm9ybT1cIm1hdHJpeCgtMC43MDcxMDcgMC43MDcxMDcgMC43MDcxMDcgMC43MDcxMDcgNDYzLjEzOCA4OC42ODY5KVwiIGZpbGw9XCIjRkYzRjNGXCIvPlxuICAgICAgICA8L3N5bWJvbD5cblxuICAgICAgICA8c3ltYm9sIGlkPVwic3ByaXRlLXNob3RzLWhvd25lZWRcIiB2aWV3Qm94PVwiMCAwIDQ3NCAxMzhcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgIDxyZWN0IHg9XCIxLjVcIiB5PVwiMS41XCIgd2lkdGg9XCIyMTYuMTk2XCIgaGVpZ2h0PVwiMTIxLjMwOVwiIHJ4PVwiOS41XCIgc3Ryb2tlPVwid2hpdGVcIiBzdHJva2Utd2lkdGg9XCIzXCIvPlxuICAgICAgICAgICAgPHJlY3QgeD1cIjI1NS40OVwiIHk9XCIxLjVcIiB3aWR0aD1cIjIxNi4xOTZcIiBoZWlnaHQ9XCIxMjEuMzA5XCIgcng9XCI5LjVcIiBzdHJva2U9XCJ3aGl0ZVwiIHN0cm9rZS13aWR0aD1cIjNcIi8+XG4gICAgICAgICAgICA8cmVjdCB4PVwiNTQuMTI2MlwiIHk9XCIxMDMuODE4XCIgd2lkdGg9XCI0Ny43MjQxXCIgaGVpZ2h0PVwiNS4xNDg5MVwiIHJ4PVwiMi41NzQ0NlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgIDxyZWN0IG9wYWNpdHk9XCIwLjI4XCIgeD1cIjE2LjQ0OTdcIiB5PVwiMTAzLjgxOFwiIHdpZHRoPVwiMTg2LjQwOVwiIGhlaWdodD1cIjUuMTQ4OTFcIiByeD1cIjIuNTc0NDZcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICA8cmVjdCB4PVwiMzAyLjgxM1wiIHk9XCIyNy44OTE5XCIgd2lkdGg9XCI1OC4wNzc0XCIgaGVpZ2h0PVwiNS4xNDg5MVwiIHJ4PVwiMi41NzQ0NlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgIDxyZWN0IHg9XCIzNDUuNDg1XCIgeT1cIjEwLjE5MzhcIiB3aWR0aD1cIjM2LjIwNjhcIiBoZWlnaHQ9XCI1LjE0ODkxXCIgcng9XCIyLjU3NDQ2XCIgZmlsbD1cIndoaXRlXCIvPlxuICAgICAgICAgICAgPHJlY3QgeD1cIjMxOS4zMzZcIiB5PVwiNDQuMTA2OVwiIHdpZHRoPVwiNDEuNTU0MlwiIGhlaWdodD1cIjUuMTQ4OTFcIiByeD1cIjIuNTc0NDZcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICA8cmVjdCB4PVwiMzEyLjc1MVwiIHk9XCI2MC4zMjE5XCIgd2lkdGg9XCI0OC4xMzk0XCIgaGVpZ2h0PVwiNS4xNDg5MVwiIHJ4PVwiMi41NzQ0NlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgIDxyZWN0IG9wYWNpdHk9XCIwLjY2XCIgeD1cIjMxNi4yNVwiIHk9XCI3Ni41MzY4XCIgd2lkdGg9XCI0NC42NDExXCIgaGVpZ2h0PVwiNS4xNDg5MVwiIHJ4PVwiMi41NzQ0NlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgIDxyZWN0IG9wYWNpdHk9XCIwLjM4XCIgeD1cIjM0Mi4zODVcIiB5PVwiOTIuNzUxN1wiIHdpZHRoPVwiMTguNTA1NFwiIGhlaWdodD1cIjUuMTQ4OTFcIiByeD1cIjIuNTc0NDZcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICA8cmVjdCBvcGFjaXR5PVwiMC4yOFwiIHg9XCIzMDguNDI5XCIgeT1cIjEwOC45NjdcIiB3aWR0aD1cIjUyLjQ2MTJcIiBoZWlnaHQ9XCI0LjA0MjY2XCIgcng9XCIyLjAyMTMzXCIgZmlsbD1cIndoaXRlXCIvPlxuICAgICAgICAgICAgPHJlY3QgeD1cIjM3MS4xMTNcIiB5PVwiMjcuODkxOVwiIHdpZHRoPVwiMzguMjEyOVwiIGhlaWdodD1cIjUuMTQ4OTFcIiByeD1cIjIuNTc0NDZcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICA8cmVjdCB4PVwiMzcxLjExM1wiIHk9XCI0NC4xMDY5XCIgd2lkdGg9XCI0Ny44MjY3XCIgaGVpZ2h0PVwiNS4xNDg5MVwiIHJ4PVwiMi41NzQ0NlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgIDxyZWN0IHg9XCIzNzEuMTEzXCIgeT1cIjYwLjMyMTlcIiB3aWR0aD1cIjI5LjMwNTRcIiBoZWlnaHQ9XCI1LjE0ODkxXCIgcng9XCIyLjU3NDQ2XCIgZmlsbD1cIndoaXRlXCIvPlxuICAgICAgICAgICAgPHJlY3Qgb3BhY2l0eT1cIjAuNjZcIiB4PVwiMzcxLjExM1wiIHk9XCI3Ni41MzY4XCIgd2lkdGg9XCI0NC4zMjgxXCIgaGVpZ2h0PVwiNS4xNDg5MVwiIHJ4PVwiMi41NzQ0NlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgIDxyZWN0IG9wYWNpdHk9XCIwLjI4XCIgeD1cIjM3MS4xMTNcIiB5PVwiMTA4Ljk2N1wiIHdpZHRoPVwiMzAuOTUxN1wiIGhlaWdodD1cIjUuMTQ4OTFcIiByeD1cIjIuNTc0NDZcIiBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICA8cmVjdCB4PVwiNTkuMjc1MVwiIHk9XCIxMDAuNzRcIiB3aWR0aD1cIjExLjMwNDRcIiBoZWlnaHQ9XCI1LjE0ODkxXCIgcng9XCIyLjU3NDQ2XCIgdHJhbnNmb3JtPVwicm90YXRlKDkwIDU5LjI3NTEgMTAwLjc0KVwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgIDxyZWN0IHg9XCIxMDEuODVcIiB5PVwiMTAwLjc0XCIgd2lkdGg9XCIxMS4zMDQ0XCIgaGVpZ2h0PVwiNS4xNDg5MVwiIHJ4PVwiMi41NzQ0NlwiIHRyYW5zZm9ybT1cInJvdGF0ZSg5MCAxMDEuODUgMTAwLjc0KVwiIGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgIDxyZWN0IHg9XCI0MjMuMzg2XCIgeT1cIjg4LjY4NjlcIiB3aWR0aD1cIjYyLjUwNjRcIiBoZWlnaHQ9XCI2LjI4NzYyXCIgcng9XCIzLjE0MzgxXCIgdHJhbnNmb3JtPVwicm90YXRlKDQ1IDQyMy4zODYgODguNjg2OSlcIiBmaWxsPVwiI0ZGM0YzRlwiLz5cbiAgICAgICAgICAgIDxyZWN0IHdpZHRoPVwiNjIuNTA2NFwiIGhlaWdodD1cIjYuMjg3NjJcIiByeD1cIjMuMTQzODFcIiB0cmFuc2Zvcm09XCJtYXRyaXgoLTAuNzA3MTA3IDAuNzA3MTA3IDAuNzA3MTA3IDAuNzA3MTA3IDQ2My4xMzggODguNjg2OSlcIiBmaWxsPVwiI0ZGM0YzRlwiLz5cbiAgICAgICAgPC9zeW1ib2w+XG4gICAgYFxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Nwcml0ZXMnKS5pbm5lckhUTUwgKz0gc3ByaXRlc1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5pdFxufSIsImZ1bmN0aW9uIHZpZGVvU2NyZWVuU2hvdCh2aWRlbywgc2NyZWVuX3dpZHRoID0gMzIwKXtcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICBsZXQgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgbGV0IHNjYWxlID0gc2NyZWVuX3dpZHRoIC8gdmlkZW8udmlkZW9XaWR0aFxuXG4gICAgbGV0IHdpZHRoID0gTWF0aC5yb3VuZCh2aWRlby52aWRlb1dpZHRoICogc2NhbGUpXG4gICAgbGV0IGhlaWdodCA9IE1hdGgucm91bmQodmlkZW8udmlkZW9IZWlnaHQgKiBzY2FsZSlcblxuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoXG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodFxuXG4gICAgdHJ5e1xuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgd2lkdGgsIGhlaWdodClcbiAgICB9XG4gICAgY2F0Y2goZSl7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Nob3RzJywgJ3ZpZGVvIHNjcmVlbnNob3QgZXJyb3I6JywgZS5tZXNzYWdlKVxuICAgIH1cblxuICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKVxufVxuXG5mdW5jdGlvbiB2aWRlb1JlcGxhY2VTdGF0dXMoZnJvbSwgdG8pe1xuICAgIHRvLnN0YXR1cyA9IGZyb20uc3RhdHVzXG4gICAgdG8uc2NyZWVuID0gZnJvbS5zY3JlZW5cbiAgICB0by5maWxlICAgPSBmcm9tLmZpbGVcbn1cblxuZnVuY3Rpb24gZ2V0QmFsYW5zZXIoY2FyZCl7XG4gICAgbGV0IGhpc3RvcnlfZGF0YSA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdvbmxpbmVfd2F0Y2hlZF9sYXN0JywgJ3t9JylcbiAgICBsZXQgaGlzdG9yeV9rZXkgID0gTGFtcGEuVXRpbHMuaGFzaChjYXJkLm5hbWUgPyBjYXJkLm9yaWdpbmFsX25hbWUgOiBjYXJkLm9yaWdpbmFsX3RpdGxlKVxuICAgIGxldCBoaXN0b3J5X2l0ZW0gPSBoaXN0b3J5X2RhdGFbaGlzdG9yeV9rZXldXG5cbiAgICByZXR1cm4gaGlzdG9yeV9pdGVtICYmIGhpc3RvcnlfaXRlbS5iYWxhbnNlciA/IGhpc3RvcnlfaXRlbS5iYWxhbnNlciA6ICcnXG59XG5cbmZ1bmN0aW9uIHNob3J0Vm9pY2Uodm9pY2Upe1xuICAgIHJldHVybiAodm9pY2UgfHwgJycpLnJlcGxhY2UoL1xcc1teYS16QS1a0LAt0Y/QkC3QrzAtOV0uKiQvLCAnJykudHJpbSgpXG59XG5cbmZ1bmN0aW9uIGlzVFNRdWFsaXR5KHN0cil7XG4gICAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJyB0cycpID4gLTEgfHwgc3RyLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignIGFkJykgPiAtMVxufVxuXG5mdW5jdGlvbiBtb2RhbChodG1sLCBidXR0b25zLCBiYWNrKXtcbiAgICBsZXQgYm9keSA9ICQoJzxkaXY+PC9kaXY+JylcbiAgICBsZXQgZm9vdGVyID0gJCgnPGRpdiBjbGFzcz1cInNob3RzLW1vZGFsLWZvb3RlclwiPjwvZGl2PicpXG5cbiAgICBib2R5LmFwcGVuZChodG1sKVxuICAgIGJvZHkuYXBwZW5kKGZvb3RlcilcblxuICAgIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKT0+e1xuICAgICAgICBsZXQgYnRuID0gTGFtcGEuVGVtcGxhdGUuZ2V0KCdzaG90c19idXR0b24nLCB7dGV4dDogYnV0dG9uLm5hbWV9KVxuXG4gICAgICAgIGJ0bi5vbignaG92ZXI6ZW50ZXInLCAoKT0+e1xuICAgICAgICAgICAgaWYoYnV0dG9uLm9uU2VsZWN0KSBidXR0b24ub25TZWxlY3QoKVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmKGJ1dHRvbi5jYW5jZWwpIGJ0bi5hZGRDbGFzcygnc2hvdHMtc2VsZWN0b3ItLXRyYW5zcGFyZW50JylcblxuICAgICAgICBmb290ZXIuYXBwZW5kKGJ0bilcbiAgICB9KVxuXG4gICAgTGFtcGEuTW9kYWwub3Blbih7XG4gICAgICAgIGh0bWw6IGJvZHksXG4gICAgICAgIHNpemU6ICdzbWFsbCcsXG4gICAgICAgIHNjcm9sbDoge1xuICAgICAgICAgICAgbm9wYWRkaW5nOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIG9uQmFjazogYmFja1xuICAgIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICB2aWRlb1NjcmVlblNob3QsXG4gICAgdmlkZW9SZXBsYWNlU3RhdHVzLFxuICAgIGdldEJhbGFuc2VyLFxuICAgIHNob3J0Vm9pY2UsXG4gICAgaXNUU1F1YWxpdHksXG4gICAgbW9kYWxcbn0iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgcXVvdGFfbmV4dF9yZWNvcmQ6IDEwMDAgKiA2MCAqIDEwLCAvLyAxMCDQvNC40L3Rg9GCXG4gICAgdmlkZW9fc2l6ZTogMTI4MCxcbiAgICBzY3JlZW5fc2l6ZTogNTAwLFxuICAgIHJlY29yZGVyX21heF9kdXJhdGlvbjogNjAgKiA1LCAvLyA1INC80LjQvdGD0YJcbiAgICBjZG46ICdodHRwczovL2Nkbi5jdWIucmlwL3Nob3RzLydcbn0iLCJmdW5jdGlvbiBjb3VudGVyKG1ldGhvZCwgdjEsIHYyLCB2Myl7XG4gICAgJC5hamF4KHtcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgdXJsOiBMYW1wYS5VdGlscy5wcm90b2NvbCgpICsgTGFtcGEuTWFuaWZlc3QuY3ViX2RvbWFpbiArICcvYXBpL21ldHJpYy9zdGF0P21ldGhvZD0nK21ldGhvZCsnJnZhbHVlX29uZT0nICsgKHYxIHx8ICcnKSArICcmdmFsdWVfdHdvPScgKyAodjIgfHwgJycpICsgJyZ2YWx1ZV90aHJlZT0nICsgKHYzIHx8ICcnKVxuICAgIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjb3VudGVyXG59IiwiaW1wb3J0IFV0aWxzIGZyb20gJy4uL3V0aWxzL3V0aWxzLmpzJ1xuaW1wb3J0IERlZmluZWQgZnJvbSAnLi4vZGVmaW5lZC5qcydcbmltcG9ydCBNZXRyaWMgZnJvbSAnLi4vdXRpbHMvbWV0cmljLmpzJ1xuXG5cbmZ1bmN0aW9uIFJlY29yZGVyKHZpZGVvKXtcbiAgICB0aGlzLmh0bWwgPSBMYW1wYS5UZW1wbGF0ZS5nZXQoJ3Nob3RzX3BsYXllcl9yZWNvcmRlcicpXG5cbiAgICBsZXQgc3RhcnRfcG9pbnQgPSB2aWRlby5jdXJyZW50VGltZVxuXG4gICAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE1ldHJpYy5jb3VudGVyKCdzaG90c19yZWNvcmRlcl9zdGFydCcpXG4gICAgICAgIFxuICAgICAgICB0cnl7XG4gICAgICAgICAgICB0aGlzLnNjcmVlbnNob3QgPSBVdGlscy52aWRlb1NjcmVlblNob3QodmlkZW8sIERlZmluZWQuc2NyZWVuX3NpemUpXG5cbiAgICAgICAgICAgIHRoaXMucnVuKClcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlKXtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1JlY29yZGVyJywgZS5tZXNzYWdlKVxuXG4gICAgICAgICAgICB0aGlzLmVycm9yKGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJ1biA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQodGhpcy5odG1sKVxuXG4gICAgICAgIGxldCBidXR0b25fc3RvcCA9IHRoaXMuaHRtbC5maW5kKCcuc2hvdHMtcGxheWVyLXJlY29yZGVyX19zdG9wJylcbiAgICAgICAgbGV0IGJ1dHRvbl9mb3J3YXJkID0gdGhpcy5odG1sLmZpbmQoJy5zaG90cy1wbGF5ZXItcmVjb3JkZXJfX2ZvcndhcmQnKVxuICAgICAgICBsZXQgYnV0dG9uX3Jld2luZCA9IHRoaXMuaHRtbC5maW5kKCcuc2hvdHMtcGxheWVyLXJlY29yZGVyX19yZXdpbmQnKVxuXG4gICAgICAgIGJ1dHRvbl9zdG9wLm9uKCdob3ZlcjplbnRlcicsIHRoaXMuc3RvcC5iaW5kKHRoaXMpKVxuXG4gICAgICAgIGJ1dHRvbl9mb3J3YXJkLm9uKCdob3ZlcjplbnRlcicsICgpPT57XG4gICAgICAgICAgICBpZih2aWRlby5jdXJyZW50VGltZSA8IHN0YXJ0X3BvaW50ICsgRGVmaW5lZC5yZWNvcmRlcl9tYXhfZHVyYXRpb24pe1xuICAgICAgICAgICAgICAgIHZpZGVvLmN1cnJlbnRUaW1lICs9IDVcbiAgICAgICAgICAgICAgICB0aGlzLnRpaygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgYnV0dG9uX3Jld2luZC5vbignaG92ZXI6ZW50ZXInLCAoKT0+e1xuICAgICAgICAgICAgaWYodmlkZW8uY3VycmVudFRpbWUgLSAxMCA+IHN0YXJ0X3BvaW50KXtcbiAgICAgICAgICAgICAgICB2aWRlby5jdXJyZW50VGltZSAtPSA1XG4gICAgICAgICAgICAgICAgdGhpcy50aWsoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIExhbXBhLkNvbnRyb2xsZXIuYWRkKCdyZWNvcmRlcicse1xuICAgICAgICAgICAgdG9nZ2xlOiAoKT0+e1xuICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY29sbGVjdGlvblNldCh0aGlzLmh0bWwpXG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jb2xsZWN0aW9uRm9jdXMoYnV0dG9uX3N0b3AsIHRoaXMuaHRtbClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWZ0OiAoKT0+e1xuICAgICAgICAgICAgICAgIE5hdmlnYXRvci5tb3ZlKCdsZWZ0JylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByaWdodDogKCk9PntcbiAgICAgICAgICAgICAgICBOYXZpZ2F0b3IubW92ZSgncmlnaHQnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhY2s6IHRoaXMuc3RvcC5iaW5kKHRoaXMpXG4gICAgICAgIH0pXG5cbiAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ3JlY29yZGVyJylcblxuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy50aWsuYmluZCh0aGlzKSwgMTAwMClcblxuICAgICAgICB0aGlzLnRpaygpXG5cbiAgICAgICAgdGhpcy5vblJ1bigpXG4gICAgfVxuXG4gICAgdGhpcy50aWsgPSBmdW5jdGlvbigpe1xuICAgICAgICBsZXQgc2Vjb25kcyAgPSBNYXRoLnJvdW5kKHZpZGVvLmN1cnJlbnRUaW1lIC0gc3RhcnRfcG9pbnQpXG4gICAgICAgIGxldCBwcm9ncmVzcyA9IExhbXBhLlV0aWxzLnNlY29uZHNUb1RpbWUoc2Vjb25kcykuc3BsaXQoJzonKVxuICAgICAgICAgICAgcHJvZ3Jlc3MgPSBwcm9ncmVzc1sxXSArICc6JyArIHByb2dyZXNzWzJdXG5cbiAgICAgICAgdGhpcy5odG1sLmZpbmQoJy5zaG90cy1wbGF5ZXItcmVjb3JkZXJfX3RleHQgc3BhbicpLnRleHQocHJvZ3Jlc3MgKyAnIC8gJyArIExhbXBhLlV0aWxzLnNlY29uZHNUb1RpbWVIdW1hbihEZWZpbmVkLnJlY29yZGVyX21heF9kdXJhdGlvbikpXG5cbiAgICAgICAgaWYoc2Vjb25kcyA+PSBEZWZpbmVkLnJlY29yZGVyX21heF9kdXJhdGlvbikgdGhpcy5zdG9wKClcbiAgICB9XG5cbiAgICB0aGlzLmVycm9yID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpXG5cbiAgICAgICAgdGhpcy5vbkVycm9yKGUpXG5cbiAgICAgICAgTWV0cmljLmNvdW50ZXIoJ3Nob3RzX3JlY29yZGVyX2Vycm9yJylcbiAgICB9XG5cbiAgICB0aGlzLnN0b3AgPSBmdW5jdGlvbigpe1xuICAgICAgICBsZXQgZWxhcHNlZCA9IHZpZGVvLmN1cnJlbnRUaW1lIC0gc3RhcnRfcG9pbnRcblxuICAgICAgICBpZihlbGFwc2VkIDwgMSl7XG4gICAgICAgICAgICB0aGlzLmVycm9yKG5ldyBFcnJvcignU3RvcGVkIHRvbyBlYXJseSwgbWF5YmUgY29kZWNzIG5vdCBzdXBwb3J0ZWQnKSlcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95KClcblxuICAgICAgICAgICAgdGhpcy5vblN0b3Aoe1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBNYXRoLnJvdW5kKGVsYXBzZWQpLFxuICAgICAgICAgICAgICAgIHNjcmVlbnNob3Q6IHRoaXMuc2NyZWVuc2hvdCxcbiAgICAgICAgICAgICAgICBzdGFydF9wb2ludDogTWF0aC5yb3VuZChzdGFydF9wb2ludCksXG4gICAgICAgICAgICAgICAgZW5kX3BvaW50OiBNYXRoLnJvdW5kKHZpZGVvLmN1cnJlbnRUaW1lKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgTWV0cmljLmNvdW50ZXIoJ3Nob3RzX3JlY29yZGVyX2VuZCcpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpXG5cbiAgICAgICAgdGhpcy5odG1sLnJlbW92ZSgpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWNvcmRlciIsImltcG9ydCBVdGlscyBmcm9tICcuLi91dGlscy91dGlscy5qcydcblxuZnVuY3Rpb24gVGFncyh0YWdzX2RhdGEgPSBmYWxzZSl7XG4gICAgdGhpcy5odG1sID0gTGFtcGEuVGVtcGxhdGUuZ2V0KCdzaG90c190YWdzJylcblxuICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYodGFnc19kYXRhKSB0aGlzLnVwZGF0ZSh0YWdzX2RhdGEpXG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgbGV0IHRhZ3MgPSBbXVxuXG4gICAgICAgIHRoaXMuaHRtbC5lbXB0eSgpXG5cbiAgICAgICAgZGF0YS5zZWFzb24gJiYgdGFncy5wdXNoKCdTLScrZGF0YS5zZWFzb24pXG4gICAgICAgIGRhdGEuZXBpc29kZSAmJiB0YWdzLnB1c2goJ0UtJytkYXRhLmVwaXNvZGUpXG5cbiAgICAgICAgbGV0IHZvaWNlID0gVXRpbHMuc2hvcnRWb2ljZShkYXRhLnZvaWNlX25hbWUpXG5cbiAgICAgICAgaWYoZGF0YS52b2ljZV9uYW1lICYmIHZvaWNlICE9PSBkYXRhLmNhcmRfdGl0bGUpIHRhZ3MucHVzaCh2b2ljZSlcblxuICAgICAgICB0aGlzLmh0bWwuYXBwZW5kKHRhZ3MubWFwKHRhZz0+JzxkaXY+Jyt0YWcrJzwvZGl2PicpLmpvaW4oJycpKVxuICAgIH1cblxuICAgIHRoaXMucmVuZGVyID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbFxuICAgIH1cblxuICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuaHRtbC5yZW1vdmUoKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFncyIsImltcG9ydCBUYWdzIGZyb20gJy4vdGFncy5qcydcblxuZnVuY3Rpb24gUHJldmlldyhkYXRhKXtcbiAgICB0aGlzLmRhdGEgPSBkYXRhXG4gICAgdGhpcy5odG1sID0gTGFtcGEuVGVtcGxhdGUuZ2V0KCdzaG90c19wcmV2aWV3JylcblxuICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYodGhpcy5kYXRhLnJlY29yZGluZy5zY3JlZW5zaG90KXtcbiAgICAgICAgICAgIHRoaXMuaHRtbC5maW5kKCcuc2hvdHMtcHJldmlld19fc2NyZWVuc2hvdCBpbWcnKS5jc3Moe29wYWNpdHk6IDF9KS5lcSgwKVswXS5zcmMgPSB0aGlzLmRhdGEucmVjb3JkaW5nLnNjcmVlbnNob3RcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZWxlYXNlX2RhdGUgPSB0aGlzLmRhdGEucGxheV9kYXRhLmNhcmQucmVsZWFzZV9kYXRlIHx8IHRoaXMuZGF0YS5wbGF5X2RhdGEuY2FyZC5maXJzdF9haXJfZGF0ZSB8fCAnJ1xuICAgICAgICBsZXQgeWVhciA9IHJlbGVhc2VfZGF0ZS5zbGljZSgwLDQpXG5cbiAgICAgICAgdGhpcy5odG1sLmZpbmQoJy5zaG90cy1wcmV2aWV3X195ZWFyJykuaHRtbCh5ZWFyIHx8ICctLS0tJylcbiAgICAgICAgdGhpcy5odG1sLmZpbmQoJy5zaG90cy1wcmV2aWV3X190aXRsZScpLmh0bWwodGhpcy5kYXRhLnBsYXlfZGF0YS5jYXJkLm5hbWUgfHwgdGhpcy5kYXRhLnBsYXlfZGF0YS5jYXJkLnRpdGxlIHx8ICcnKVxuXG4gICAgICAgIHRoaXMudGFncyA9IG5ldyBUYWdzKHRoaXMuZGF0YS5wbGF5X2RhdGEpXG4gICAgICAgIHRoaXMudGFncy5jcmVhdGUoKVxuXG4gICAgICAgIHRoaXMuaHRtbC5maW5kKCcuc2hvdHMtcHJldmlld19fYm9keScpLmFwcGVuZCh0aGlzLnRhZ3MucmVuZGVyKCkpXG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXIgPSBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5odG1sXG4gICAgfVxuXG4gICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5odG1sLnJlbW92ZSgpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcmV2aWV3IiwiZnVuY3Rpb24gQ2hlY2tib3gocGFyYW1zID0ge30pe1xuICAgIHRoaXMuaHRtbCAgPSBMYW1wYS5UZW1wbGF0ZS5nZXQoJ3Nob3RzX2NoZWNrYm94JylcbiAgICB0aGlzLnN0YXRlID0gcGFyYW1zLnN0YXRlIHx8IGZhbHNlXG5cbiAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuc2V0VGV4dChwYXJhbXMudGV4dCB8fCAnJylcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLnN0YXRlKVxuXG4gICAgICAgIHRoaXMuaHRtbC5vbignaG92ZXI6ZW50ZXInLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSghdGhpcy5zdGF0ZSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLnNldFRleHQgPSBmdW5jdGlvbih0ZXh0KXtcbiAgICAgICAgdGhpcy5odG1sLmZpbmQoJy5zaG90cy1jaGVja2JveF9fdGV4dCcpLmh0bWwodGV4dClcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlID0gZnVuY3Rpb24oc3RhdGUpe1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGVcblxuICAgICAgICB0aGlzLmh0bWwudG9nZ2xlQ2xhc3MoJ3Nob3RzLWNoZWNrYm94LS1jaGVja2VkJyxzdGF0ZSlcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmh0bWxcbiAgICB9XG5cbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmh0bWwucmVtb3ZlKClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrYm94IiwiZnVuY3Rpb24gdXJsKHUpe1xuICAgIC8vcmV0dXJuICdodHRwOi8vbG9jYWxob3N0OjMxMDAvYXBpL3Nob3RzLycgKyB1XG4gICAgcmV0dXJuIExhbXBhLlV0aWxzLnByb3RvY29sKCkgKyBMYW1wYS5NYW5pZmVzdC5jdWJfZG9tYWluICsgJy9hcGkvc2hvdHMvJyArIHVcbn1cblxuZnVuY3Rpb24gcGFyYW1zKHRpbWVvdXQgPSAxNTAwMCkge1xuICAgIGlmKCFMYW1wYS5BY2NvdW50LlBlcm1pdC5hY2NvdW50LnRva2VuKSByZXR1cm4ge3RpbWVvdXQ6IHRpbWVvdXR9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICB0b2tlbjogTGFtcGEuQWNjb3VudC5QZXJtaXQuYWNjb3VudC50b2tlbixcbiAgICAgICAgICAgIHByb2ZpbGU6IExhbXBhLkFjY291bnQuUGVybWl0LmFjY291bnQucHJvZmlsZS5pZFxuICAgICAgICB9LFxuICAgICAgICB0aW1lb3V0OiB0aW1lb3V0XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYWNoZSh0b3BhcmFtcywgbGlmZSA9IDYwKXtcbiAgICB0b3BhcmFtcy5jYWNoZSA9IHtcbiAgICAgICAgbGlmZTogbGlmZVxuICAgIH1cbiAgICByZXR1cm4gdG9wYXJhbXNcbn1cblxuZnVuY3Rpb24gdXBsb2FkUmVxdWVzdChkYXRhLCBvbnN1Y2Nlc3MsIG9uZXJyb3IpIHtcbiAgICBMYW1wYS5OZXR3b3JrLnNpbGVudCh1cmwoJ3VwbG9hZC1yZXF1ZXN0JyksIG9uc3VjY2Vzcywgb25lcnJvciwgZGF0YSwgcGFyYW1zKCkpXG59XG5cbmZ1bmN0aW9uIHVwbG9hZFN0YXR1cyhpZCwgb25zdWNjZXNzLCBvbmVycm9yKSB7XG4gICAgTGFtcGEuTmV0d29yay5zaWxlbnQodXJsKCd1cGxvYWQtc3RhdHVzLycgKyBpZCksIG9uc3VjY2Vzcywgb25lcnJvciwgbnVsbCwgcGFyYW1zKDUwMDApKVxufVxuXG5mdW5jdGlvbiBzaG90c1ZpZGVvKGlkLCBvbnN1Y2Nlc3MsIG9uZXJyb3IpIHtcbiAgICBMYW1wYS5OZXR3b3JrLnNpbGVudCh1cmwoJ3ZpZGVvLycgKyBpZCksIG9uc3VjY2Vzcywgb25lcnJvciwgbnVsbCwgcGFyYW1zKDUwMDApKVxufVxuXG5mdW5jdGlvbiBzaG90c0xpc3QodHlwZSwgcGFnZSA9IDEsIG9uc3VjY2Vzcywgb25lcnJvcikge1xuICAgIExhbXBhLk5ldHdvcmsuc2lsZW50KHVybCgnbGlzdC8nICsgdHlwZSArICc/cGFnZT0nICsgcGFnZSksIG9uc3VjY2Vzcywgb25lcnJvciwgbnVsbCwgcGFyYW1zKDUwMDApKVxufVxuXG5mdW5jdGlvbiBzaG90c0NhcmQoY2FyZCwgcGFnZSA9IDEsIG9uc3VjY2Vzcywgb25lcnJvcikge1xuICAgIExhbXBhLk5ldHdvcmsuc2lsZW50KHVybCgnY2FyZC8nICsgY2FyZC5pZCArICcvJyArIChjYXJkLm9yaWdpbmFsX25hbWUgPyAndHYnIDogJ21vdmllJykgKyAnP3BhZ2U9JyArIHBhZ2UpLCBvbnN1Y2Nlc3MsIG9uZXJyb3IsIG51bGwsIHBhcmFtcyg1MDAwKSlcbn1cblxuZnVuY3Rpb24gc2hvdHNDaGFubmVsKGlkLCBwYWdlID0gMSwgb25zdWNjZXNzLCBvbmVycm9yKSB7XG4gICAgTGFtcGEuTmV0d29yay5zaWxlbnQodXJsKCdjaGFubmVsLycgKyBpZCArICc/cGFnZT0nICsgcGFnZSksIG9uc3VjY2Vzcywgb25lcnJvciwgbnVsbCwgcGFyYW1zKDEwMDAwKSlcbn1cblxuZnVuY3Rpb24gc2hvdHNMaWtlZChpZCwgdHlwZSAsb25zdWNjZXNzLCBvbmVycm9yKSB7XG4gICAgbGV0IHVpZCA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdsYW1wYV91aWQnLCcnKVxuXG4gICAgTGFtcGEuTmV0d29yay5zaWxlbnQodXJsKCdsaWtlZD91aWQ9JyArIHVpZCksIG9uc3VjY2Vzcywgb25lcnJvciwge1xuICAgICAgICBpZCxcbiAgICAgICAgdHlwZVxuICAgIH0sIHBhcmFtcyg1MDAwKSlcbn1cblxuZnVuY3Rpb24gc2hvdHNCbG9jayhpZCwgb25zdWNjZXNzLCBvbmVycm9yKSB7XG4gICAgTGFtcGEuTmV0d29yay5zaWxlbnQodXJsKCdibG9jaycpLCBvbnN1Y2Nlc3MsIG9uZXJyb3IsIHtpZH0sIHBhcmFtcygpKVxufVxuXG5mdW5jdGlvbiBzaG90c1JlcG9ydChpZCwgb25zdWNjZXNzLCBvbmVycm9yKSB7XG4gICAgTGFtcGEuTmV0d29yay5zaWxlbnQodXJsKCdyZXBvcnQnKSwgb25zdWNjZXNzLCBvbmVycm9yLCB7aWR9LCBwYXJhbXMoKSlcbn1cblxuZnVuY3Rpb24gc2hvdHNEZWxldGUoaWQsIG9uc3VjY2Vzcywgb25lcnJvcikge1xuICAgIExhbXBhLk5ldHdvcmsuc2lsZW50KHVybCgnZGVsZXRlJyksIG9uc3VjY2Vzcywgb25lcnJvciwge2lkfSwgcGFyYW1zKCkpXG59XG5cbmZ1bmN0aW9uIHNob3RzRmF2b3JpdGUoYWN0aW9uLCBzaG90LCBvbnN1Y2Nlc3MsIG9uZXJyb3IpIHtcbiAgICBMYW1wYS5OZXR3b3JrLnNpbGVudCh1cmwoJ2Zhdm9yaXRlJyksIG9uc3VjY2Vzcywgb25lcnJvciwge1xuICAgICAgICBzaWQ6IHNob3QuaWQsXG4gICAgICAgIGNhcmRfdGl0bGU6IHNob3QuY2FyZF90aXRsZSxcbiAgICAgICAgY2FyZF9wb3N0ZXI6IHNob3QuY2FyZF9wb3N0ZXIsXG4gICAgICAgIGFjdGlvblxuICAgIH0sIHBhcmFtcyg1MDAwKSlcbn1cblxuZnVuY3Rpb24gbGVudGEocXVlcnkgPSB7fSwgb25zdWNjZXNzKSB7XG4gICAgbGV0IHVpZCA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdsYW1wYV91aWQnLCcnKVxuXG4gICAgTGFtcGEuQXJyYXlzLmV4dGVuZChxdWVyeSwge1xuICAgICAgICBwYWdlOiAxLFxuICAgICAgICBzb3J0OiAnaWQnLFxuICAgICAgICB1aWQ6IHVpZCxcbiAgICAgICAgbGltaXQ6IDIwXG4gICAgfSlcblxuICAgIGxldCBwYXRoID0gW11cblxuICAgIGZvcihsZXQga2V5IGluIHF1ZXJ5KXtcbiAgICAgICAgcGF0aC5wdXNoKGtleSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChxdWVyeVtrZXldKSlcbiAgICB9XG5cbiAgICBMYW1wYS5OZXR3b3JrLnNpbGVudCh1cmwoJ2xlbnRhPycgKyBwYXRoLmpvaW4oJyYnKSksIChyZXN1bHQpPT57XG4gICAgICAgIG9uc3VjY2VzcyhyZXN1bHQucmVzdWx0cylcbiAgICB9LCAoKT0+e1xuICAgICAgICBvbnN1Y2Nlc3MoW10pXG4gICAgfSwgbnVsbCwgcGFyYW1zKDEwMDAwKSlcbn1cblxuZnVuY3Rpb24gc2hvdHNWaWV3ZWQoaWQsIG9uc3VjY2Vzcywgb25lcnJvcikge1xuICAgIGxldCB1aWQgPSBMYW1wYS5TdG9yYWdlLmdldCgnbGFtcGFfdWlkJywnJylcblxuICAgIExhbXBhLk5ldHdvcmsuc2lsZW50KHVybCgndmlld2VkP3VpZD0nICsgdWlkKSwgb25zdWNjZXNzLCBvbmVycm9yLCB7aWR9LCBwYXJhbXMoNTAwMCkpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICB1cGxvYWRSZXF1ZXN0LFxuICAgIHVwbG9hZFN0YXR1cyxcbiAgICBzaG90c0xpc3QsXG4gICAgc2hvdHNMaWtlZCxcbiAgICBzaG90c0Zhdm9yaXRlLFxuICAgIHNob3RzVmlkZW8sXG4gICAgc2hvdHNCbG9jayxcbiAgICBzaG90c1JlcG9ydCxcbiAgICBzaG90c0RlbGV0ZSxcbiAgICBzaG90c0NhcmQsXG4gICAgc2hvdHNDaGFubmVsLFxuICAgIHNob3RzVmlld2VkLFxuICAgIGxlbnRhXG59IiwiZnVuY3Rpb24gUHJvZ3Jlc3MocGFyYW1zID0ge30pe1xuICAgIHRoaXMuaHRtbCA9IExhbXBhLlRlbXBsYXRlLmdldCgnc2hvdHNfcHJvZ3Jlc3MnKVxuICAgIHRoaXMudGV4dCA9IHBhcmFtcy50ZXh0IHx8ICcnXG5cbiAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuc2V0VGV4dCh0aGlzLnRleHQpXG4gICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3MoMClcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgnd2FpdGluZycpXG4gICAgfVxuXG4gICAgdGhpcy5zZXRUZXh0ID0gZnVuY3Rpb24odGV4dCl7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHRcblxuICAgICAgICB0aGlzLmh0bWwuZmluZCgnLnNob3RzLXByb2dyZXNzX190ZXh0JykudGV4dCh0aGlzLnRleHQpXG4gICAgfVxuXG4gICAgdGhpcy5zZXRQcm9ncmVzcyA9IGZ1bmN0aW9uKHBlcmNlbnQpe1xuICAgICAgICB0aGlzLmh0bWwuZmluZCgnLnNob3RzLXByb2dyZXNzX19iYXIgZGl2JykuY3NzKCd3aWR0aCcsIHBlcmNlbnQgKyAnJScpXG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSA9IGZ1bmN0aW9uKHN0YXRlKXtcbiAgICAgICAgdGhpcy5odG1sLnJlbW92ZUNsYXNzKCdzdGF0ZS0td2FpdGluZyBzdGF0ZS0tdXBsb2FkaW5nIHN0YXRlLS1kb25lJylcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaHRtbC5hZGRDbGFzcygnc3RhdGUtLScgKyBzdGF0ZSlcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmh0bWxcbiAgICB9XG5cbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmh0bWwucmVtb3ZlKClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2dyZXNzIiwiaW1wb3J0IEFwaSBmcm9tICcuL2FwaS5qcydcblxubGV0IHNob3RzID0ge31cblxuZnVuY3Rpb24gaW5pdCgpe1xuICAgIExhbXBhLlRpbWVyLmFkZCgxMDAwICogNjAsICgpPT57XG4gICAgICAgIGZvcihsZXQgaSBpbiBzaG90cyl7XG4gICAgICAgICAgICBjaGVjayhzaG90c1tpXSlcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGNoZWNrKHNob3Qpe1xuICAgIGlmKHNob3Quc3RhdHVzID09ICdyZWFkeScgfHwgc2hvdC5zdGF0dXMgPT0gJ2Vycm9yJykgcmV0dXJuIHN0b3Aoc2hvdClcblxuICAgIEFwaS51cGxvYWRTdGF0dXMoc2hvdC5pZCwgKGpzb24pPT57XG4gICAgICAgIGlmKGpzb24uc3RhdHVzID09ICdyZWFkeScpe1xuICAgICAgICAgICAgTGFtcGEuQmVsbC5wdXNoKHtcbiAgICAgICAgICAgICAgICBpY29uOiAnPHN2Zz48dXNlIHhsaW5rOmhyZWY9XCIjc3ByaXRlLXNob3RzXCI+PC91c2U+PC9zdmc+JyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnc2hvdHNfdXBsb2FkX2NvbXBsZXRlX25vdGlmeScpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoanNvbi5zdGF0dXMgPT0gJ2Vycm9yJyl7XG4gICAgICAgICAgICBMYW1wYS5CZWxsLnB1c2goe1xuICAgICAgICAgICAgICAgIGljb246ICc8c3ZnPjx1c2UgeGxpbms6aHJlZj1cIiNzcHJpdGUtc2hvdHNcIj48L3VzZT48L3N2Zz4nLFxuICAgICAgICAgICAgICAgIHRleHQ6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c191cGxvYWRfZXJyb3Jfbm90aWZ5JylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBpZihqc29uLnN0YXR1cyA9PSAncmVhZHknIHx8IGpzb24uc3RhdHVzID09ICdlcnJvcicpIHN0b3Aoc2hvdClcblxuICAgICAgICBMYW1wYS5MaXN0ZW5lci5zZW5kKCdzaG90c19zdGF0dXMnLCB7Li4uanNvbn0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gYWRkKHNob3Qpe1xuICAgIGlmKCFzaG90c1tzaG90LmlkXSkgc2hvdHNbc2hvdC5pZF0gPSBzaG90XG59XG5cbmZ1bmN0aW9uIHN0b3Aoc2hvdCl7XG4gICAgZGVsZXRlIHNob3RzW3Nob3QuaWRdXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0LFxuICAgIGFkZCxcbiAgICBzdG9wXG59IiwiaW1wb3J0IEFwaSBmcm9tICcuL2FwaS5qcydcblxubGV0IGNyZWF0ZWQgPSBbXVxuXG5mdW5jdGlvbiBpbml0KCl7XG4gICAgY3JlYXRlZCA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdzaG90c19jcmVhdGVkJywgJ1tdJylcblxuICAgIHVwZGF0ZSgpXG5cbiAgICBMYW1wYS5MaXN0ZW5lci5mb2xsb3coJ3Nob3RzX3N0YXR1cycsIHVwZGF0ZVN0YXR1cylcbiAgICBMYW1wYS5MaXN0ZW5lci5mb2xsb3coJ3Nob3RzX3VwZGF0ZScsIHVwZGF0ZURhdGEpXG5cbiAgICBMYW1wYS5MaXN0ZW5lci5mb2xsb3coJ3N0YXRlOmNoYW5nZWQnLCAoZSk9PntcbiAgICAgICAgaWYoZS50YXJnZXQgPT0gJ2Zhdm9yaXRlJyAmJiAoZS5yZWFzb24gPT0gJ3Byb2ZpbGUnIHx8IGUucmVhc29uID09ICdyZWFkJykpe1xuICAgICAgICAgICAgY3JlYXRlZCAgPSBbXVxuXG4gICAgICAgICAgICB1cGRhdGUoKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIExhbXBhLlNvY2tldC5saXN0ZW5lci5mb2xsb3coJ21lc3NhZ2UnLCAocmVzdWx0KT0+e1xuICAgICAgICBpZihyZXN1bHQubWV0aG9kID09ICd1cGRhdGUnICYmIHJlc3VsdC5kYXRhLmZyb20gPT0gJ3Nob3RzJyAmJiByZXN1bHQuZGF0YS5saXN0ID09ICdjcmVhdGVkJyl7XG4gICAgICAgICAgICB1cGRhdGUoKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gdXBkYXRlU3RhdHVzKHNob3Qpe1xuICAgIGxldCBmaW5kID0gY3JlYXRlZC5maW5kKGE9PmEuaWQgPT0gc2hvdC5pZClcblxuICAgIGlmKGZpbmQpe1xuICAgICAgICBmaW5kLnN0YXR1cyA9IHNob3Quc3RhdHVzXG4gICAgICAgIGZpbmQuc2NyZWVuID0gc2hvdC5zY3JlZW5cbiAgICAgICAgZmluZC5maWxlICAgPSBzaG90LmZpbGVcblxuICAgICAgICBMYW1wYS5TdG9yYWdlLnNldCgnc2hvdHNfY3JlYXRlZCcsIGNyZWF0ZWQpXG4gICAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVEYXRhKHNob3Qpe1xuICAgIGxldCBmaW5kID0gY3JlYXRlZC5maW5kKGE9PmEuaWQgPT0gc2hvdC5pZClcblxuICAgIGlmKGZpbmQpe1xuICAgICAgICBmaW5kLmxpa2VkID0gc2hvdC5saWtlZFxuICAgICAgICBmaW5kLnNhdmVkID0gc2hvdC5zYXZlZFxuXG4gICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdzaG90c19jcmVhdGVkJywgY3JlYXRlZClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSgpe1xuICAgIEFwaS5zaG90c0xpc3QoJ2NyZWF0ZWQnLCAxLCAoc2hvdHMpPT57XG4gICAgICAgIGNyZWF0ZWQgPSBzaG90cy5yZXN1bHRzXG5cbiAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ3Nob3RzX2NyZWF0ZWQnLCBjcmVhdGVkKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGFkZChzaG90KXtcbiAgICBsZXQgY2xvbmUgPSB7fVxuXG4gICAgT2JqZWN0LmFzc2lnbihjbG9uZSwgc2hvdClcblxuICAgIGRlbGV0ZSBjbG9uZS5wYXJhbXNcblxuICAgIExhbXBhLkFycmF5cy5pbnNlcnQoY3JlYXRlZCwgMCwgY2xvbmUpXG5cbiAgICBpZihjcmVhdGVkLmxlbmd0aCA+IDIwKXtcbiAgICAgICAgY3JlYXRlZCA9IGNyZWF0ZWQuc2xpY2UoMCwyMClcbiAgICB9XG5cbiAgICBMYW1wYS5TdG9yYWdlLnNldCgnc2hvdHNfY3JlYXRlZCcsIGNyZWF0ZWQpXG5cbiAgICBMYW1wYS5Tb2NrZXQuc2VuZCgndXBkYXRlJywge3BhcmFtczoge2Zyb206ICdzaG90cycsIGxpc3Q6ICdjcmVhdGVkJ319KVxufVxuXG5mdW5jdGlvbiByZW1vdmUoc2hvdCl7XG4gICAgbGV0IGZpbmRfaW4gPSBjcmVhdGVkLmZpbmQoYT0+YS5pZCA9PSBzaG90LmlkKVxuXG4gICAgaWYoZmluZF9pbikgTGFtcGEuQXJyYXlzLnJlbW92ZShjcmVhdGVkLCBmaW5kX2luKVxuXG4gICAgTGFtcGEuU3RvcmFnZS5zZXQoJ3Nob3RzX2NyZWF0ZWQnLCBjcmVhdGVkKVxuXG4gICAgTGFtcGEuTGlzdGVuZXIuc2VuZCgnc2hvdHNfc3RhdHVzJywge2lkOiBzaG90LmlkLCBzdGF0dXM6ICdkZWxldGVkJywgZmlsZTogc2hvdC5maWxlLCBzY3JlZW46IHNob3Quc2NyZWVufSlcblxuICAgIExhbXBhLlNvY2tldC5zZW5kKCd1cGRhdGUnLCB7cGFyYW1zOiB7ZnJvbTogJ3Nob3RzJywgbGlzdDogJ2NyZWF0ZWQnfX0pXG59XG5cbmZ1bmN0aW9uIHBhZ2UocGFnZSwgY2FsbGJhY2spe1xuICAgIEFwaS5zaG90c0xpc3QoJ2NyZWF0ZWQnLCBwYWdlLCAoc2hvdHMpPT57XG4gICAgICAgIGNhbGxiYWNrKHNob3RzLnJlc3VsdHMpXG4gICAgfSwgKCk9PntcbiAgICAgICAgY2FsbGJhY2soW10pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZ2V0KCl7XG4gICAgcmV0dXJuIExhbXBhLkFycmF5cy5jbG9uZShjcmVhdGVkKVxufVxuXG5mdW5jdGlvbiBmaW5kKGlkKXtcbiAgICByZXR1cm4gQm9vbGVhbihjcmVhdGVkLmZpbmQoYT0+YS5pZCA9PSBpZCkpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0LFxuICAgIHJlbW92ZSxcbiAgICBhZGQsXG4gICAgZ2V0LFxuICAgIGZpbmQsXG4gICAgcGFnZVxufSIsImZ1bmN0aW9uIFNlbGVjdG9yKGxpc3Qpe1xuICAgIHRoaXMuaHRtbCA9ICQoJzxkaXYgY2xhc3M9XCJzaG90cy1zZWxlY3Rvci10YWdzXCI+PC9kaXY+JylcbiAgICB0aGlzLmxpc3QgPSBsaXN0IHx8IFtdXG5cbiAgICB0aGlzLnNlbGVjdGVkID0gW11cblxuICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2godD0+e1xuICAgICAgICAgICAgbGV0IHRhZyA9ICQoJzxkaXYgY2xhc3M9XCJzaG90cy1zZWxlY3Rvci10YWdzX190YWcgc2VsZWN0b3JcIj48c3Bhbj4nK3QudGl0bGUrJzwvc3Bhbj48L2Rpdj4nKVxuXG4gICAgICAgICAgICB0YWcub24oJ2hvdmVyOmVudGVyJywgKGUpPT57XG4gICAgICAgICAgICAgICAgdGFnLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxuXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZC5pbmRleE9mKHQpID09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5wdXNoKHQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMYW1wYS5BcnJheXMucmVtb3ZlKHRoaXMuc2VsZWN0ZWQsIHQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5odG1sLmFwcGVuZCh0YWcpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5nZXQgPSBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFxuICAgIH1cblxuICAgIHRoaXMucmVuZGVyID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbFxuICAgIH1cblxuICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuaHRtbC5yZW1vdmUoKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0b3IiLCJsZXQgdGFncyA9IFtcbiAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICBzbHVnOiAnYWN0aW9uJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogMixcbiAgICAgICAgc2x1ZzogJ2NvbWVkeSdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6IDMsXG4gICAgICAgIHNsdWc6ICdkcmFtYSdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6IDQsXG4gICAgICAgIHNsdWc6ICdmYW50YXN5J1xuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogNSxcbiAgICAgICAgc2x1ZzogJ2hvcnJvcidcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6IDYsXG4gICAgICAgIHNsdWc6ICd0aHJpbGxlcidcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6IDcsXG4gICAgICAgIHNsdWc6ICdhbmltZSdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6IDgsXG4gICAgICAgIHNsdWc6ICdzY2lfZmknXG4gICAgfVxuXVxuXG5mdW5jdGlvbiBsb2FkKCl7XG4gICAgdGFncyA9IHRyYW5zbGF0ZSh0YWdzKVxufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGUobGlzdCl7XG4gICAgcmV0dXJuIGxpc3QubWFwKHQ9PntcbiAgICAgICAgdC50aXRsZSA9IExhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c190YWdfJyt0LnNsdWcpXG5cbiAgICAgICAgcmV0dXJuIHRcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBsaXN0KCl7XG4gICAgcmV0dXJuIHRhZ3Ncbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGxvYWQsXG4gICAgbGlzdCxcbiAgICB0cmFuc2xhdGVcbn0iLCJpbXBvcnQgUHJldmlldyBmcm9tICcuL3ByZXZpZXcuanMnXG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnLi9jaGVja2JveC5qcydcbmltcG9ydCBBcGkgZnJvbSAnLi4vdXRpbHMvYXBpLmpzJ1xuaW1wb3J0IFByb2dyZXNzIGZyb20gJy4vcHJvZ3Jlc3MuanMnXG5pbXBvcnQgSGFuZGxlciBmcm9tICcuLi91dGlscy9oYW5kbGVyLmpzJ1xuaW1wb3J0IENyZWF0ZWQgZnJvbSAnLi4vdXRpbHMvY3JlYXRlZC5qcydcbmltcG9ydCBTZWxlY3RvciBmcm9tICcuL3NlbGVjdG9yLmpzJ1xuaW1wb3J0IFRhZ3MgZnJvbSAnLi4vdXRpbHMvdGFncy5qcydcblxuZnVuY3Rpb24gVXBsb2FkKGRhdGEpe1xuICAgIHRoaXMuZGF0YSA9IGRhdGFcbiAgICB0aGlzLmh0bWwgPSBMYW1wYS5UZW1wbGF0ZS5nZXQoJ3Nob3RzX21vZGFsX3VwbG9hZCcpXG5cbiAgICB0aGlzLnN0YXJ0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5wcmV2aWV3ICA9IG5ldyBQcmV2aWV3KHRoaXMuZGF0YSlcblxuICAgICAgICB0aGlzLmNoZWNrYm94ID0gbmV3IENoZWNrYm94KHtcbiAgICAgICAgICAgIHRleHQ6IExhbXBhLkxhbmcudHJhbnNsYXRlKCfQodC00LXQu9Cw0YLRjCDQv9GD0LHQu9C40YfQvdC+0LknKSxcbiAgICAgICAgICAgIHN0YXRlOiB0cnVlXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IG5ldyBQcm9ncmVzcyh7XG4gICAgICAgICAgICB0ZXh0OiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnc2hvdHNfdXBsb2FkX3Byb2dyZXNzX3N0YXJ0JylcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLnNlbGVjdG9yX3RpdGxlID0gJCgnPGRpdiBjbGFzcz1cInNob3RzLWxpbmUtdGl0bGVcIj4nK0xhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c19jaG9pY2VfdGFncycpKyc8L2Rpdj4nKVxuICAgICAgICB0aGlzLnNlbGVjdG9yID0gbmV3IFNlbGVjdG9yKFRhZ3MubGlzdCgpKVxuXG4gICAgICAgIHRoaXMuY2hlY2tib3guY3JlYXRlKClcbiAgICAgICAgdGhpcy5wcmV2aWV3LmNyZWF0ZSgpXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MuY3JlYXRlKClcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5yZW5kZXIoKS5hZGRDbGFzcygnaGlkZScpXG4gICAgICAgIHRoaXMuc2VsZWN0b3IuY3JlYXRlKClcblxuICAgICAgICB0aGlzLmJ1dHRvbl91cGxvYWQgICA9IExhbXBhLlRlbXBsYXRlLmdldCgnc2hvdHNfYnV0dG9uJywge3RleHQ6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c19tb2RhbF9idXR0b25fdXBsb2FkX3N0YXJ0Jyl9KVxuICAgICAgICB0aGlzLmJ1dHRvbl9jYW5jZWwgICA9IExhbXBhLlRlbXBsYXRlLmdldCgnc2hvdHNfYnV0dG9uJywge3RleHQ6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c19tb2RhbF9idXR0b25fdXBsb2FkX2NhbmNlbCcpfSlcbiAgICAgICAgdGhpcy5idXR0b25fYWdhaW4gICAgPSBMYW1wYS5UZW1wbGF0ZS5nZXQoJ3Nob3RzX2J1dHRvbicsIHt0ZXh0OiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnc2hvdHNfbW9kYWxfYnV0dG9uX3VwbG9hZF9hZ2FpbicpfSlcbiAgICAgICAgdGhpcy5idXR0b25fY29tcGxldGUgPSBMYW1wYS5UZW1wbGF0ZS5nZXQoJ3Nob3RzX2J1dHRvbicsIHt0ZXh0OiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnc2hvdHNfbW9kYWxfYnV0dG9uX3VwbG9hZF9jb21wbGV0ZScpfSlcbiAgICAgICAgdGhpcy50ZXh0X2NvbXBsZXRlICAgPSBMYW1wYS5UZW1wbGF0ZS5nZXQoJ3Nob3RzX3VwbG9hZF9jb21wbGV0ZV90ZXh0JylcbiAgICAgICAgdGhpcy50ZXh0X25vdGljZSAgICAgPSBMYW1wYS5UZW1wbGF0ZS5nZXQoJ3Nob3RzX3VwbG9hZF9ub3RpY2VfdGV4dCcpXG5cbiAgICAgICAgdGhpcy5idXR0b25fYWdhaW4uYWRkQ2xhc3MoJ2hpZGUnKS5vbignaG92ZXI6ZW50ZXInLCB0aGlzLnN0YXJ0VXBsb2FkLmJpbmQodGhpcykpXG4gICAgICAgIHRoaXMuYnV0dG9uX3VwbG9hZC5vbignaG92ZXI6ZW50ZXInLCB0aGlzLnN0YXJ0VXBsb2FkLmJpbmQodGhpcykpXG5cbiAgICAgICAgdGhpcy5idXR0b25fY29tcGxldGUuYWRkQ2xhc3MoJ2hpZGUnKS5vbignaG92ZXI6ZW50ZXInLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95KClcblxuICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlKHRoaXMuc2hvdF9yZWFkeSlcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLnRleHRfY29tcGxldGUuYWRkQ2xhc3MoJ2hpZGUnKVxuXG4gICAgICAgIHRoaXMuYnV0dG9uX2NhbmNlbC5hZGRDbGFzcygnc2hvdHMtc2VsZWN0b3ItLXRyYW5zcGFyZW50JylcbiAgICAgICAgdGhpcy5idXR0b25fY2FuY2VsLm9uKCdob3ZlcjplbnRlcicsIHRoaXMuY2FuY2VsVXBsb2FkLmJpbmQodGhpcykpXG5cbiAgICAgICAgdGhpcy5odG1sLmZpbmQoJy5zaG90cy1tb2RhbC11cGxvYWRfX3ByZXZpZXcnKS5hcHBlbmQodGhpcy5wcmV2aWV3LnJlbmRlcigpKVxuICAgICAgICB0aGlzLmh0bWwuZmluZCgnLnNob3RzLW1vZGFsLXVwbG9hZF9fYm9keScpXG4gICAgICAgICAgICAuYXBwZW5kKHRoaXMudGV4dF9ub3RpY2UpXG4gICAgICAgICAgICAuYXBwZW5kKHRoaXMuc2VsZWN0b3JfdGl0bGUpXG4gICAgICAgICAgICAuYXBwZW5kKHRoaXMuc2VsZWN0b3IucmVuZGVyKCkpXG4gICAgICAgICAgICAuYXBwZW5kKHRoaXMuYnV0dG9uX3VwbG9hZClcbiAgICAgICAgICAgIC5hcHBlbmQodGhpcy5wcm9ncmVzcy5yZW5kZXIoKSlcbiAgICAgICAgICAgIC5hcHBlbmQodGhpcy5idXR0b25fYWdhaW4pXG4gICAgICAgICAgICAuYXBwZW5kKHRoaXMuYnV0dG9uX2NhbmNlbClcbiAgICAgICAgICAgIC5hcHBlbmQodGhpcy50ZXh0X2NvbXBsZXRlKVxuICAgICAgICAgICAgLmFwcGVuZCh0aGlzLmJ1dHRvbl9jb21wbGV0ZSlcblxuICAgICAgICBMYW1wYS5Nb2RhbC5vcGVuKHtcbiAgICAgICAgICAgIGh0bWw6IHRoaXMuaHRtbCxcbiAgICAgICAgICAgIHNpemU6ICdzbWFsbCcsXG4gICAgICAgICAgICBzY3JvbGw6IHtcbiAgICAgICAgICAgICAgICBub3BhZGRpbmc6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkJhY2s6ICgpPT57fVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgdGhpcy5zZXRGb2N1cyA9IGZ1bmN0aW9uKHRhcmdldCl7XG4gICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY2xlYXIoKVxuICAgICAgICBMYW1wYS5Db250cm9sbGVyLmNvbGxlY3Rpb25TZXQodGhpcy5odG1sKVxuICAgICAgICBMYW1wYS5Db250cm9sbGVyLmNvbGxlY3Rpb25Gb2N1cyh0YXJnZXQsIHRoaXMuaHRtbClcbiAgICB9XG5cbiAgICB0aGlzLnN0YXJ0VXBsb2FkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5idXR0b25fYWdhaW4uYWRkQ2xhc3MoJ2hpZGUnKVxuICAgICAgICB0aGlzLmJ1dHRvbl91cGxvYWQuYWRkQ2xhc3MoJ2hpZGUnKVxuICAgICAgICB0aGlzLnByb2dyZXNzLnJlbmRlcigpLnJlbW92ZUNsYXNzKCdoaWRlJylcblxuICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMucHJvZ3Jlc3MucmVuZGVyKCkpXG5cbiAgICAgICAgdGhpcy5wcm9ncmVzcy5zZXRUZXh0KExhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c191cGxvYWRfcHJvZ3Jlc3Nfc3RhcnQnKSlcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5zZXRTdGF0ZSgnd2FpdGluZycpXG5cbiAgICAgICAgbGV0IHBsYXkgPSB0aGlzLmRhdGEucGxheV9kYXRhXG4gICAgICAgIGxldCBjYXJkID0gcGxheS5jYXJkXG5cbiAgICAgICAgQXBpLnVwbG9hZFJlcXVlc3Qoe1xuICAgICAgICAgICAgY2FyZF9pZDogY2FyZC5pZCxcbiAgICAgICAgICAgIGNhcmRfdHlwZTogY2FyZC5vcmlnaW5hbF9uYW1lID8gJ3R2JyA6ICdtb3ZpZScsXG4gICAgICAgICAgICBjYXJkX3RpdGxlOiBjYXJkLnRpdGxlIHx8IGNhcmQubmFtZSB8fCBjYXJkLm9yaWdpbmFsX3RpdGxlIHx8IGNhcmQub3JpZ2luYWxfbmFtZSB8fCAnVW5rbm93bicsXG4gICAgICAgICAgICBjYXJkX3llYXI6IChjYXJkLnJlbGVhc2VfZGF0ZSB8fCBjYXJkLmZpcnN0X2Fpcl9kYXRlIHx8ICctLS0tJykuc2xpY2UoMCw0KSxcbiAgICAgICAgICAgIGNhcmRfcG9zdGVyOiBjYXJkLnBvc3Rlcl9wYXRoIHx8ICcnLFxuXG4gICAgICAgICAgICBzdGFydF9wb2ludDogdGhpcy5kYXRhLnJlY29yZGluZy5zdGFydF9wb2ludCxcbiAgICAgICAgICAgIGVuZF9wb2ludDogdGhpcy5kYXRhLnJlY29yZGluZy5lbmRfcG9pbnQsXG5cbiAgICAgICAgICAgIHNlYXNvbjogcGxheS5zZWFzb24gfHwgMCxcbiAgICAgICAgICAgIGVwaXNvZGU6IHBsYXkuZXBpc29kZSB8fCAwLFxuICAgICAgICAgICAgdm9pY2VfbmFtZTogcGxheS52b2ljZV9uYW1lIHx8ICcnLFxuICAgICAgICAgICAgYmFsYW5zZXI6IHBsYXkuYmFsYW5zZXIgfHwgJycsXG5cbiAgICAgICAgICAgIHRhZ3M6IHRoaXMuc2VsZWN0b3IuZ2V0KCkubWFwKHQ9PnQuaWQpLFxuXG4gICAgICAgICAgICByZWNvcmRlcjogJ25ldycsXG4gICAgICAgIH0sIHRoaXMuZW5kVXBsb2FkLmJpbmQodGhpcyksIHRoaXMuZXJyb3JVcGxvYWQuYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICB0aGlzLmVycm9yVXBsb2FkID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MucmVuZGVyKCkuYWRkQ2xhc3MoJ2hpZGUnKVxuICAgICAgICB0aGlzLmJ1dHRvbl9hZ2Fpbi5yZW1vdmVDbGFzcygnaGlkZScpXG5cbiAgICAgICAgdGhpcy5zZXRGb2N1cyh0aGlzLmJ1dHRvbl9hZ2FpbilcbiAgICB9XG5cblxuICAgIHRoaXMuZW5kVXBsb2FkID0gZnVuY3Rpb24odXBsb2FkKXtcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5yZW5kZXIoKS5hZGRDbGFzcygnaGlkZScpXG4gICAgICAgIHRoaXMuYnV0dG9uX2NhbmNlbC5hZGRDbGFzcygnaGlkZScpXG4gICAgICAgIHRoaXMuYnV0dG9uX2NvbXBsZXRlLnJlbW92ZUNsYXNzKCdoaWRlJylcbiAgICAgICAgdGhpcy50ZXh0X2NvbXBsZXRlLnJlbW92ZUNsYXNzKCdoaWRlJylcbiAgICAgICAgdGhpcy50ZXh0X25vdGljZS5hZGRDbGFzcygnaGlkZScpXG4gICAgICAgIHRoaXMuc2VsZWN0b3JfdGl0bGUucmVtb3ZlKClcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5kZXN0cm95KClcblxuICAgICAgICBMYW1wYS5TdG9yYWdlLnNldCgnc2hvdHNfbGFzdF9yZWNvcmQnLCBEYXRlLm5vdygpKVxuXG4gICAgICAgIEFwaS5zaG90c1ZpZGVvKHVwbG9hZC5pZCwgKHJlc3VsdCk9PntcbiAgICAgICAgICAgIENyZWF0ZWQuYWRkKHJlc3VsdC52aWRlbylcblxuICAgICAgICAgICAgSGFuZGxlci5hZGQocmVzdWx0LnZpZGVvKVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5idXR0b25fY29tcGxldGUpXG4gICAgfVxuXG4gICAgdGhpcy5jYW5jZWxVcGxvYWQgPSBmdW5jdGlvbigpe1xuICAgICAgICBpZih0aGlzLnVwbG9hZGluZykgdGhpcy51cGxvYWRpbmcuYWJvcnQoKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5kZXN0cm95KClcblxuICAgICAgICB0aGlzLm9uQ2FuY2VsKClcbiAgICB9XG5cbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICBMYW1wYS5Nb2RhbC5jbG9zZSgpXG5cbiAgICAgICAgdGhpcy5wcmV2aWV3LmRlc3Ryb3koKVxuICAgICAgICB0aGlzLmNoZWNrYm94LmRlc3Ryb3koKVxuICAgICAgICB0aGlzLmh0bWwucmVtb3ZlKClcblxuICAgICAgICB0aGlzLnJ1blVwbG9hZCA9ICgpPT57fVxuICAgICAgICB0aGlzLmVuZFVwbG9hZCA9ICgpPT57fVxuICAgICAgICB0aGlzLmNhbmNlbFVwbG9hZCA9ICgpPT57fVxuICAgICAgICB0aGlzLm5vdGlmeVVwbG9hZCA9ICgpPT57fVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVXBsb2FkIiwiaW1wb3J0IEFwaSBmcm9tICcuL2FwaS5qcydcblxubGV0IGxvYWRlZF9zaG90cyA9IHt9XG5cbmZ1bmN0aW9uIGluaXQoKXtcbiAgICBsZXQgYnV0dG9uID0gYDxkaXYgY2xhc3M9XCJmdWxsLXN0YXJ0X19idXR0b24gc2hvdHMtdmlldy1idXR0b24gc2VsZWN0b3Igdmlldy0tb25saW5lXCIgZGF0YS1zdWJ0aXRsZT1cIiN7c2hvdHNfd2F0Y2h9XCI+XG4gICAgICAgIDxzdmc+PHVzZSB4bGluazpocmVmPVwiI3Nwcml0ZS1zaG90c1wiPjwvdXNlPjwvc3ZnPlxuXG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2hvdHMtdmlldy1idXR0b25fX3RpdGxlXCI+U2hvdHM8L3NwYW4+XG4gICAgPC9kaXY+YFxuXG4gICAgTGFtcGEuTGlzdGVuZXIuZm9sbG93KCdmdWxsJywoZSk9PntcbiAgICAgICAgaWYoZS50eXBlID09ICdjb21wbGl0ZScgJiYgKExhbXBhLlN0b3JhZ2UuZmllbGQoJ3Nob3RzX2luX2NhcmQnKSB8fCBMYW1wYS5TdG9yYWdlLmZpZWxkKCdzaG90c19pbl9wbGF5ZXInKSkpe1xuICAgICAgICAgICAgbGV0IGJ0biA9ICQoTGFtcGEuTGFuZy50cmFuc2xhdGUoYnV0dG9uKSlcbiAgICAgICAgICAgIGxldCBtb3YgPSBlLmRhdGEubW92aWVcblxuICAgICAgICAgICAgYnRuLm9uKCdob3ZlcjplbnRlcicsKCk9PntcbiAgICAgICAgICAgICAgICBMYW1wYS5BY3Rpdml0eS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdTaG90cycsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogJ3Nob3RzX2NhcmQnLFxuICAgICAgICAgICAgICAgICAgICBjYXJkOiBtb3YsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IDFcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgbG9hZChtb3YsIChzaG90cyk9PntcbiAgICAgICAgICAgICAgICBpZihzaG90cy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU2hvdHMnLCdsb2FkIGZvciBmdWxsIHZpZXc6Jywgc2hvdHMubGVuZ3RoLCAnaXRlbXM7JywgJ2NhcmQgaWQ6JywgbW92LmlkLCBtb3Yub3JpZ2luYWxfbmFtZSA/ICd0dicgOiAnbW92aWUnKVxuXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5hdHRyKCdkYXRhLXN1YnRpdGxlJywgTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX3dhdGNoJykgKyAnIDxzcGFuIGNsYXNzPVwic2hvdHMtdmlldy1idXR0b25fX2NvdW50XCI+JyArIChzaG90cy5sZW5ndGggPiA5OSA/ICc5OSsnIDogc2hvdHMubGVuZ3RoKSArICc8L3NwYW4+JylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZihMYW1wYS5TdG9yYWdlLmZpZWxkKCdzaG90c19pbl9jYXJkJykpIGUub2JqZWN0LmFjdGl2aXR5LnJlbmRlcigpLmZpbmQoJy52aWV3LS10b3JyZW50JykubGFzdCgpLmFmdGVyKGJ0bilcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGxvYWQoY2FyZCwgY2FsbCl7XG4gICAgbGV0IGtleSA9IGNhcmQuaWQgKyAnXycgKyAoY2FyZC5vcmlnaW5hbF9uYW1lID8gJ3R2JyA6ICdtb3ZpZScpXG5cbiAgICBpZihsb2FkZWRfc2hvdHNba2V5XSl7XG4gICAgICAgIGNhbGwobG9hZGVkX3Nob3RzW2tleV0pXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIEFwaS5zaG90c0NhcmQoY2FyZCwgMSwgKGRhdGEpPT57XG4gICAgICAgICAgICBsb2FkZWRfc2hvdHNba2V5XSA9IGRhdGEucmVzdWx0c1xuXG4gICAgICAgICAgICBjYWxsKGRhdGEucmVzdWx0cylcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyKCl7XG4gICAgbG9hZGVkX3Nob3RzID0ge31cbn1cblxuZnVuY3Rpb24gcmVtb3ZlKGNhcmQpe1xuICAgIGxldCBrZXkgPSBjYXJkLmlkICsgJ18nICsgKGNhcmQub3JpZ2luYWxfbmFtZSA/ICd0dicgOiAnbW92aWUnKVxuXG4gICAgZGVsZXRlIGxvYWRlZF9zaG90c1trZXldXG59XG5cbmZ1bmN0aW9uIGdldChjYXJkKXtcbiAgICBsZXQga2V5ID0gY2FyZC5pZCArICdfJyArIChjYXJkLm9yaWdpbmFsX25hbWUgPyAndHYnIDogJ21vdmllJylcblxuICAgIHJldHVybiBsb2FkZWRfc2hvdHNba2V5XVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5pdCxcbiAgICBsb2FkLFxuICAgIGNsZWFyLFxuICAgIHJlbW92ZSxcbiAgICBnZXRcbn0iLCJpbXBvcnQgUmVjb3JkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9yZWNvcmRlci5qcydcbmltcG9ydCBVcGxvYWQgZnJvbSAnLi4vY29tcG9uZW50cy91cGxvYWQuanMnXG5pbXBvcnQgQXBpIGZyb20gJy4uL3V0aWxzL2FwaS5qcydcbmltcG9ydCBEZWZpbmVkIGZyb20gJy4uL2RlZmluZWQuanMnXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgVmlldyBmcm9tICcuLi91dGlscy92aWV3LmpzJ1xuXG5sZXQgYnV0dG9uX3JlY29yZCA9IG51bGxcbmxldCBwbGF5X2RhdGEgICAgID0ge31cbmxldCBwbGF5ZXJfc2hvdHMgID0gbnVsbFxuXG5mdW5jdGlvbiBpbml0KCl7XG4gICAgTGFtcGEuUGxheWVyLmxpc3RlbmVyLmZvbGxvdygncmVhZHknLCBzdGFydFBsYXllcilcblxuICAgIExhbXBhLlBsYXllci5saXN0ZW5lci5mb2xsb3coJ2Rlc3Ryb3knLCBzdG9wUGxheWVyKVxuXG4gICAgYnV0dG9uX3JlY29yZCA9IExhbXBhLlRlbXBsYXRlLmdldCgnc2hvdHNfcGxheWVyX3JlY29yZF9idXR0b24nKVxuXG4gICAgYnV0dG9uX3JlY29yZC5vbignaG92ZXI6ZW50ZXInLCBiZWZvcmVSZWNvcmRpbmcpXG5cbiAgICBidXR0b25fcmVjb3JkLmFkZENsYXNzKCdoaWRlJylcblxuICAgIExhbXBhLlBsYXllclBhbmVsLnJlbmRlcigpLmZpbmQoJy5wbGF5ZXItcGFuZWxfX3NldHRpbmdzJykuYWZ0ZXIoYnV0dG9uX3JlY29yZClcblxuICAgIExhbXBhLkNvbnRyb2xsZXIubGlzdGVuZXIuZm9sbG93KCd0b2dnbGUnLCAoZSk9PntcbiAgICAgICAgaWYocGxheWVyX3Nob3RzKSBwbGF5ZXJfc2hvdHMudG9nZ2xlQ2xhc3MoJ2ZvY3VzJywgZS5uYW1lID09ICdwbGF5ZXJfcmV3aW5kJyB8fCBMYW1wYS5QbGF0Zm9ybS5tb3VzZSgpIHx8IExhbXBhLlV0aWxzLmlzVG91Y2hEZXZpY2UoKSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBwbGF5ZXJQYW5lbChzdGF0dXMpe1xuICAgIExhbXBhLlBsYXllci5yZW5kZXIoKS50b2dnbGVDbGFzcygnc2hvdHMtcGxheWVyLS1yZWNvcmRpbmcnLCFzdGF0dXMpXG59XG5cbmZ1bmN0aW9uIHN0YXJ0UGxheWVyKGRhdGEpe1xuICAgIHBsYXlfZGF0YSA9IHt9XG5cbiAgICBpZihkYXRhLmNhcmQpIHBsYXlfZGF0YS5jYXJkID0gZGF0YS5jYXJkXG4gICAgZWxzZSBpZihMYW1wYS5BY3Rpdml0eS5hY3RpdmUoKS5tb3ZpZSl7XG4gICAgICAgIHBsYXlfZGF0YS5jYXJkID0gTGFtcGEuQWN0aXZpdHkuYWN0aXZlKCkubW92aWVcbiAgICB9XG5cbiAgICBsZXQgcG9zc2libHkgPSB0cnVlXG4gICAgbGV0IHR5cGUgICAgID0gcGxheV9kYXRhLmNhcmQ/Lm9yaWdpbmFsX25hbWUgPyAndHYnIDogJ21vdmllJ1xuXG4gICAgaWYoZGF0YS5pcHR2IHx8IGRhdGEueW91dHViZSkgcG9zc2libHkgPSBmYWxzZVxuICAgIGVsc2UgaWYoIUxhbXBhLkFjY291bnQuUGVybWl0LnRva2VuKSBwb3NzaWJseSA9IGZhbHNlXG4gICAgZWxzZSBpZih0eXBlID09ICd0dicgJiYgKCFkYXRhLnNlYXNvbiB8fCAhZGF0YS5lcGlzb2RlKSkgcG9zc2libHkgPSBmYWxzZVxuXG4gICAgaWYocG9zc2libHkpe1xuICAgICAgICBwbGF5X2RhdGEuc2Vhc29uICAgICA9IGRhdGEuc2Vhc29uIHx8IDBcbiAgICAgICAgcGxheV9kYXRhLmVwaXNvZGUgICAgPSBkYXRhLmVwaXNvZGUgfHwgMFxuICAgICAgICBwbGF5X2RhdGEudm9pY2VfbmFtZSA9IChkYXRhLnZvaWNlX25hbWUgfHwgJycpLnRyaW0oKVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgIHBsYXlfZGF0YS5iYWxhbnNlciA9IFV0aWxzLmdldEJhbGFuc2VyKHBsYXlfZGF0YS5jYXJkIHx8IHt9KVxuICAgICAgICB9LDEwMDApXG5cbiAgICAgICAgaWYocGxheV9kYXRhLmNhcmQpe1xuICAgICAgICAgICAgbGV0IHllYXIgPSBwYXJzZUludCgocGxheV9kYXRhLmNhcmQucmVsZWFzZV9kYXRlIHx8IHBsYXlfZGF0YS5jYXJkLmZpcnN0X2Fpcl9kYXRlIHx8ICctLS0tJykuc2xpY2UoMCw0KSlcblxuICAgICAgICAgICAgaWYodHlwZSA9PSAnbW92aWUnKXtcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyX3RpdGxlID0gTGFtcGEuUGxheWVyLnBsYXlkYXRhKCkudGl0bGUgfHwgJydcblxuICAgICAgICAgICAgICAgIHBsYXlfZGF0YS52b2ljZV9uYW1lID0gKHBsYXlfZGF0YS52b2ljZV9uYW1lIHx8IHBsYXllcl90aXRsZSB8fCAnJykudHJpbSgpXG5cbiAgICAgICAgICAgICAgICBpZihwbGF5X2RhdGEudm9pY2VfbmFtZSA9PSBwbGF5X2RhdGEuY2FyZC50aXRsZSB8fCBwbGF5X2RhdGEudG9ycmVudF9oYXNoKSBwbGF5X2RhdGEudm9pY2VfbmFtZSA9ICcnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCEoVXRpbHMuaXNUU1F1YWxpdHkocGxheV9kYXRhLnZvaWNlX25hbWUpIHx8IFV0aWxzLmlzVFNRdWFsaXR5KExhbXBhLlBsYXllci5wbGF5ZGF0YSgpLnRpdGxlKSkgJiYgeWVhciA+PSAxOTg1KSBidXR0b25fcmVjb3JkLnJlbW92ZUNsYXNzKCdoaWRlJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKHBsYXlfZGF0YS5jYXJkICYmIChwbGF5X2RhdGEuY2FyZC5zb3VyY2UgPT0gJ3RtZGInIHx8IHBsYXlfZGF0YS5jYXJkLnNvdXJjZSA9PSAnY3ViJykpe1xuICAgICAgICBpZihMYW1wYS5TdG9yYWdlLmZpZWxkKCdzaG90c19pbl9wbGF5ZXInKSkgcGxheWVyU2hvdHNTZWdtZW50cygpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBzdG9wUGxheWVyKCl7XG4gICAgYnV0dG9uX3JlY29yZC5hZGRDbGFzcygnaGlkZScpXG5cbiAgICBpZihwbGF5ZXJfc2hvdHMpe1xuICAgICAgICBwbGF5ZXJfc2hvdHMucmVtb3ZlKClcbiAgICAgICAgcGxheWVyX3Nob3RzID0gbnVsbFxuICAgIH1cblxuICAgIHBsYXllclBhbmVsKHRydWUpXG5cbiAgICBpZihwbGF5X2RhdGEubmVlZF90b2NvbnRlbnQpe1xuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnY29udGVudCcpXG4gICAgICAgIH0sIDEwMClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBsYXllclNob3RzU2VnbWVudHMoKXtcbiAgICBsZXQgdHlwZSAgPSBwbGF5X2RhdGEuY2FyZC5vcmlnaW5hbF9uYW1lID8gJ3R2JyA6ICdtb3ZpZSdcbiAgICBsZXQgdmlkZW8gPSBMYW1wYS5QbGF5ZXJWaWRlby52aWRlbygpXG5cbiAgICBpZih0eXBlID09ICd0dicgJiYgKCFwbGF5X2RhdGEuc2Vhc29uIHx8ICFwbGF5X2RhdGEuZXBpc29kZSkpIHJldHVyblxuXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkZGF0YScsICgpPT57XG4gICAgICAgIFZpZXcubG9hZChwbGF5X2RhdGEuY2FyZCwgKHNob3RzKT0+e1xuICAgICAgICAgICAgaWYoIUxhbXBhLlBsYXllci5vcGVuZWQoKSkgcmV0dXJuXG5cbiAgICAgICAgICAgIGlmKHR5cGUgPT0gJ3R2JyAmJiBwbGF5X2RhdGEuc2Vhc29uICYmIHBsYXlfZGF0YS5lcGlzb2RlKXtcbiAgICAgICAgICAgICAgICBzaG90cyA9IHNob3RzLmZpbHRlcigoZSk9PmUuc2Vhc29uID09IHBsYXlfZGF0YS5zZWFzb24gJiYgZS5lcGlzb2RlID09IHBsYXlfZGF0YS5lcGlzb2RlKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzaG90cy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHBsYXllcl9zaG90cyA9ICQoJzxkaXYgY2xhc3M9XCJzaG90cy1wbGF5ZXItc2VnbWVudHNcIj48L2Rpdj4nKVxuXG4gICAgICAgICAgICAgICAgcGxheWVyX3Nob3RzLnRvZ2dsZUNsYXNzKCdmb2N1cycsIExhbXBhLlBsYXRmb3JtLm1vdXNlKCkgfHwgTGFtcGEuVXRpbHMuaXNUb3VjaERldmljZSgpKVxuXG4gICAgICAgICAgICAgICAgc2hvdHMgPSBzaG90cy5maWx0ZXIocz0+e1xuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0YDRgtC40YDRg9C10Lwg0L/QviBzdGFydF9wb2ludCDQvtC00LjQvSDRgNCw0Lcg0Lgg0LjRgdC/0L7Qu9GM0LfRg9C10Lwg0LLRgNC10LzQtdC90L3Ri9C1INC/0L7Qu9GPINC90LAg0LzQsNGB0YHQuNCy0LVcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNob3RzLl9zb3J0ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdHMuc29ydCgoYSxiKT0+IChOdW1iZXIoYS5zdGFydF9wb2ludCl8fDApIC0gKE51bWJlcihiLnN0YXJ0X3BvaW50KXx8MCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdHMuX3NvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG90cy5fbGFzdF9lbmQgPSAtSW5maW5pdHk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBOdW1iZXIocy5zdGFydF9wb2ludCB8fCAwKVxuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kICAgPSBOdW1iZXIocy5lbmRfcG9pbnQgfHwgc3RhcnQpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L/QtdGA0LXQutGA0YvQstCw0LXRgtGB0Y8g0YEg0L/RgNC10LTRi9C00YPRidC40Lwg0LLQutC70Y7Rh9GR0L3QvdGL0Lwg4oCUINC40YHQutC70Y7Rh9Cw0LXQvFxuICAgICAgICAgICAgICAgICAgICBpZihzdGFydCA8IHNob3RzLl9sYXN0X2VuZCkgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgICAgICAgICAgICAgLy8g0L7QsdC90L7QstC70Y/QtdC8INC60YDQsNC5INGC0LXQutGD0YnQtdCz0L4g0LLQutC70Y7Rh9GR0L3QvdC+0LPQviDRgdC10LPQvNC10L3RgtCwXG4gICAgICAgICAgICAgICAgICAgIHNob3RzLl9sYXN0X2VuZCA9IE1hdGgubWF4KHNob3RzLl9sYXN0X2VuZCwgZW5kKVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHNob3RzLmZvckVhY2goKGVsZW0pPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWdtZW50ID0gJCgnPGRpdiBjbGFzcz1cInNob3RzLXBsYXllci1zZWdtZW50c19fdGltZVwiPjwvZGl2PicpXG4gICAgICAgICAgICAgICAgICAgIGxldCBwaWN0dXJlID0gJCgnPGRpdiBjbGFzcz1cInNob3RzLXBsYXllci1zZWdtZW50c19fcGljdHVyZVwiPjxpbWcgc3JjPVwiJytlbGVtLmltZysnXCI+PC9kaXY+JylcblxuICAgICAgICAgICAgICAgICAgICBsZXQgaW1nID0gcGljdHVyZS5maW5kKCdpbWcnKVswXVxuXG4gICAgICAgICAgICAgICAgICAgIGltZy5vbignbG9hZCcsICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBwaWN0dXJlLmFkZENsYXNzKCdzaG90cy1wbGF5ZXItc2VnbWVudHNfX3BpY3R1cmUtLWxvYWRlZCcpXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogKGVsZW0uc3RhcnRfcG9pbnQgLyB2aWRlby5kdXJhdGlvbiAqIDEwMCkgKyAnJScsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogKChlbGVtLmVuZF9wb2ludCAtIGVsZW0uc3RhcnRfcG9pbnQpIC8gdmlkZW8uZHVyYXRpb24gKiAxMDApICsgJyUnXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgcGljdHVyZS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogKGVsZW0uc3RhcnRfcG9pbnQgLyB2aWRlby5kdXJhdGlvbiAqIDEwMCkgKyAnJSdcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJfc2hvdHMuYXBwZW5kKHNlZ21lbnQpXG4gICAgICAgICAgICAgICAgICAgIHBsYXllcl9zaG90cy5hcHBlbmQocGljdHVyZSlcblxuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjID0gZWxlbS5zY3JlZW5cblxuICAgICAgICAgICAgICAgICAgICBwaWN0dXJlLm9uKCdjbGljaycsICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2xpY2sgc2hvdCcsIGVsZW0sIGVsZW0uc3RhcnRfcG9pbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5QbGF5ZXJWaWRlby50byhlbGVtLnN0YXJ0X3BvaW50KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBMYW1wYS5QbGF5ZXJQYW5lbC5yZW5kZXIoKS5maW5kKCcucGxheWVyLXBhbmVsX190aW1lbGluZScpLmJlZm9yZShwbGF5ZXJfc2hvdHMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcGxheVBsYXllcigpe1xuICAgIExhbXBhLlBsYXllclZpZGVvLnBsYXkoKVxuICAgIExhbXBhLlBsYXllclBhbmVsLnZpc2libGUoZmFsc2UpXG4gICAgTGFtcGEuUGxheWVyUGFuZWwuaGlkZSgpXG5cbiAgICBwbGF5ZXJQYW5lbChmYWxzZSlcbn1cblxuZnVuY3Rpb24gcGF1c2VQbGF5ZXIoKXtcbiAgICBMYW1wYS5QbGF5ZXJWaWRlby5wYXVzZSgpXG4gICAgTGFtcGEuUGxheWVyUGFuZWwudmlzaWJsZShmYWxzZSlcbiAgICBMYW1wYS5QbGF5ZXJQYW5lbC5oaWRlKClcblxuICAgIHBsYXllclBhbmVsKHRydWUpXG59XG5cbmZ1bmN0aW9uIGNsb3NlTW9kYWwoKXtcbiAgICBMYW1wYS5Nb2RhbC5jbG9zZSgpXG5cbiAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgncGxheWVyJylcblxuICAgIExhbXBhLlBsYXllclZpZGVvLnBhdXNlKClcblxuICAgIHBsYXllclBhbmVsKHRydWUpXG59XG5cbmZ1bmN0aW9uIGJlZm9yZVJlY29yZGluZygpe1xuICAgIGlmKExhbXBhLk1vZGFsLm9wZW5lZCgpKXtcbiAgICAgICAgTGFtcGEuTW9kYWwuY2xvc2UoKVxuXG4gICAgICAgIHBsYXlfZGF0YS5uZWVkX3RvY29udGVudCA9IHRydWVcbiAgICB9XG5cbiAgICBwYXVzZVBsYXllcigpXG5cbiAgICBsZXQgbGVmdCA9IERhdGUubm93KCkgLSBMYW1wYS5TdG9yYWdlLmdldCgnc2hvdHNfbGFzdF9yZWNvcmQnLCAnMCcpXG5cbiAgICBpZihsZWZ0IDwgRGVmaW5lZC5xdW90YV9uZXh0X3JlY29yZCl7XG4gICAgICAgIHJldHVybiBMYW1wYS5Nb2RhbC5vcGVuKHtcbiAgICAgICAgICAgIGh0bWw6IExhbXBhLlRlbXBsYXRlLmdldCgnc2hvdHNfbW9kYWxfcXVvdGFfbGltaXQnLCB7XG4gICAgICAgICAgICAgICAgdGltZTogTGFtcGEuVXRpbHMuc2Vjb25kc1RvVGltZUh1bWFuKChEZWZpbmVkLnF1b3RhX25leHRfcmVjb3JkIC0gbGVmdCkgLyAxMDAwKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzaXplOiAnc21hbGwnLFxuICAgICAgICAgICAgc2Nyb2xsOiB7XG4gICAgICAgICAgICAgICAgbm9wYWRkaW5nOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX2J1dHRvbl9nb29kJyksXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OiBjbG9zZU1vZGFsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIG9uQmFjazogY2xvc2VNb2RhbFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIFV0aWxzLm1vZGFsKExhbXBhLlRlbXBsYXRlLmdldCgnc2hvdHNfbW9kYWxfYmVmb3JlX3JlY29yZGluZycpLCBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c19zdGFydF9yZWNvcmRpbmcnKSxcbiAgICAgICAgICAgIG9uU2VsZWN0OiAoKT0+e1xuICAgICAgICAgICAgICAgIExhbXBhLk1vZGFsLmNsb3NlKClcblxuICAgICAgICAgICAgICAgIHN0YXJ0UmVjb3JkaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX2Nob2ljZV9zdGFydF9wb2ludCcpLFxuICAgICAgICAgICAgY2FuY2VsOiB0cnVlLFxuICAgICAgICAgICAgb25TZWxlY3Q6ICgpPT57XG4gICAgICAgICAgICAgICAgTGFtcGEuTW9kYWwuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ3BsYXllcl9yZXdpbmQnKVxuXG4gICAgICAgICAgICAgICAgTGFtcGEuUGxheWVyUGFuZWwudmlzaWJsZSh0cnVlKVxuXG4gICAgICAgICAgICAgICAgcGxheWVyUGFuZWwodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIF0sIGNsb3NlTW9kYWwpXG59XG5cbmZ1bmN0aW9uIHN0YXJ0UmVjb3JkaW5nKCl7XG4gICAgbGV0IHJlY29yZGVyID0gbmV3IFJlY29yZGVyKExhbXBhLlBsYXllclZpZGVvLnZpZGVvKCkpXG5cbiAgICByZWNvcmRlci5vblN0b3AgID0gc3RvcFJlY29yZGluZ1xuICAgIHJlY29yZGVyLm9uRXJyb3IgPSBlcnJvclJlY29yZGluZ1xuICAgIHJlY29yZGVyLm9uUnVuICAgPSBwbGF5UGxheWVyXG5cbiAgICByZWNvcmRlci5zdGFydCgpXG59XG5cbmZ1bmN0aW9uIGVycm9yUmVjb3JkaW5nKGUpe1xuICAgIFV0aWxzLm1vZGFsKExhbXBhLlRlbXBsYXRlLmdldCgnc2hvdHNfbW9kYWxfZXJyb3JfcmVjb3JkaW5nJyksIFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX2J1dHRvbl9nb29kJyksXG4gICAgICAgICAgICBvblNlbGVjdDogY2xvc2VNb2RhbFxuICAgICAgICB9XG4gICAgXSwgY2xvc2VNb2RhbClcbn1cblxuZnVuY3Rpb24gc3RvcFJlY29yZGluZyhyZWNvcmRpbmcpe1xuICAgIHBhdXNlUGxheWVyKClcblxuICAgIGlmKHJlY29yZGluZy5kdXJhdGlvbiA+IDEwKXtcbiAgICAgICAgaWYocmVjb3JkaW5nLnN0YXJ0X3BvaW50IDwgNjAgfHwgcmVjb3JkaW5nLmVuZF9wb2ludCA+IChMYW1wYS5QbGF5ZXJWaWRlby52aWRlbygpLmR1cmF0aW9uIC0gNjAgKiA1KSl7XG4gICAgICAgICAgICByZWNvcmRpbmcubmVhcl9ib3JkZXIgPSB0cnVlXG5cbiAgICAgICAgICAgIFV0aWxzLm1vZGFsKExhbXBhLlRlbXBsYXRlLmdldCgnc2hvdHNfbW9kYWxfYmVmb3JlX3VwbG9hZF9yZWNvcmRpbmcnKSwgW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX2J1dHRvbl9jaG9pY2VfZnJhZ21lbnQnKSxcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6IGNsb3NlTW9kYWxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX2J1dHRvbl9jb250aW51ZV91cGxvYWQnKSxcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Nb2RhbC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VXBsb2FkUmVjb3JkaW5nKHJlY29yZGluZylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sIGNsb3NlTW9kYWwpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBzdGFydFVwbG9hZFJlY29yZGluZyhyZWNvcmRpbmcpXG4gICAgfVxuICAgIGVsc2Ugc2hvcnRSZWNvcmRpbmcoKVxufVxuXG5mdW5jdGlvbiBzdGFydFVwbG9hZFJlY29yZGluZyhyZWNvcmRpbmcpe1xuICAgIGxldCB1cGxvYWQgPSBuZXcgVXBsb2FkKHtcbiAgICAgICAgcmVjb3JkaW5nOiByZWNvcmRpbmcsXG4gICAgICAgIHBsYXlfZGF0YTogcGxheV9kYXRhXG4gICAgfSlcblxuICAgIHVwbG9hZC5vbkNhbmNlbCA9ICgpPT57XG4gICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdwbGF5ZXInKVxuXG4gICAgICAgIExhbXBhLlBsYXllclZpZGVvLnBhdXNlKClcbiAgICB9XG5cbiAgICB1cGxvYWQub25Db21wbGV0ZSA9ICgpPT57XG4gICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdwbGF5ZXInKVxuXG4gICAgICAgIExhbXBhLlBsYXllclZpZGVvLnBhdXNlKClcbiAgICB9XG5cbiAgICB1cGxvYWQuc3RhcnQoKVxufVxuXG5mdW5jdGlvbiBzaG9ydFJlY29yZGluZygpe1xuICAgIFV0aWxzLm1vZGFsKExhbXBhLlRlbXBsYXRlLmdldCgnc2hvdHNfbW9kYWxfc2hvcnRfcmVjb3JkaW5nJyksIFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX2J1dHRvbl9nb29kJyksXG4gICAgICAgICAgICBvblNlbGVjdDogY2xvc2VNb2RhbFxuICAgICAgICB9XG4gICAgXSwgY2xvc2VNb2RhbClcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGluaXRcbn0iLCJpbXBvcnQgQXBpIGZyb20gJy4vYXBpLmpzJ1xuXG5sZXQgc2hvdHMgPSB7XG4gICAgZmF2b3JpdGU6IFtdLFxuICAgIG1hcDogW11cbn1cblxuZnVuY3Rpb24gaW5pdCgpe1xuICAgIHNob3RzLmZhdm9yaXRlID0gTGFtcGEuU3RvcmFnZS5nZXQoJ3Nob3RzX2Zhdm9yaXRlJywgJ1tdJylcblxuICAgIGNyZWF0ZU1hcChMYW1wYS5TdG9yYWdlLmdldCgnc2hvdHNfbWFwJywgJ1tdJykpXG5cbiAgICB1cGRhdGUoKVxuXG4gICAgTGFtcGEuTGlzdGVuZXIuZm9sbG93KCdzaG90c19zdGF0dXMnLCB1cGRhdGVTdGF0dXMpXG4gICAgTGFtcGEuTGlzdGVuZXIuZm9sbG93KCdzaG90c191cGRhdGUnLCB1cGRhdGVEYXRhKVxuXG4gICAgTGFtcGEuTGlzdGVuZXIuZm9sbG93KCdzdGF0ZTpjaGFuZ2VkJywgKGUpPT57XG4gICAgICAgIGlmKGUudGFyZ2V0ID09ICdmYXZvcml0ZScgJiYgKGUucmVhc29uID09ICdwcm9maWxlJyB8fCBlLnJlYXNvbiA9PSAncmVhZCcpKXtcbiAgICAgICAgICAgIHNob3RzLmZhdm9yaXRlID0gW11cblxuICAgICAgICAgICAgY3JlYXRlTWFwKFtdKVxuXG4gICAgICAgICAgICB1cGRhdGUoKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIExhbXBhLlNvY2tldC5saXN0ZW5lci5mb2xsb3coJ21lc3NhZ2UnLCAocmVzdWx0KT0+e1xuICAgICAgICBpZihyZXN1bHQubWV0aG9kID09ICd1cGRhdGUnICYmIHJlc3VsdC5kYXRhLmZyb20gPT0gJ3Nob3RzJyAmJiByZXN1bHQuZGF0YS5saXN0ID09ICdmYXZvcml0ZScpe1xuICAgICAgICAgICAgdXBkYXRlKClcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1hcChhcnIpe1xuICAgIHNob3RzLm1hcCA9IHt9XG5cbiAgICBhcnIuZm9yRWFjaChpZD0+e1xuICAgICAgICBzaG90cy5tYXBbaWRdID0gMVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVN0YXR1cyhzaG90KXtcbiAgICBpZighc2hvdHMubWFwW3Nob3QuaWRdKSByZXR1cm5cblxuICAgIGxldCBmaW5kID0gc2hvdHMuZmF2b3JpdGUuZmluZChhPT5hLmlkID09IHNob3QuaWQpXG5cbiAgICBpZihmaW5kKXtcbiAgICAgICAgZmluZC5zdGF0dXMgPSBzaG90LnN0YXR1c1xuICAgICAgICBmaW5kLnNjcmVlbiA9IHNob3Quc2NyZWVuXG4gICAgICAgIGZpbmQuZmlsZSAgID0gc2hvdC5maWxlXG5cbiAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ3Nob3RzX2Zhdm9yaXRlJywgc2hvdHMuZmF2b3JpdGUpXG4gICAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVEYXRhKHNob3Qpe1xuICAgIGlmKCFzaG90cy5tYXBbc2hvdC5pZF0pIHJldHVyblxuXG4gICAgbGV0IGZpbmQgPSBzaG90cy5mYXZvcml0ZS5maW5kKGE9PmEuaWQgPT0gc2hvdC5pZClcblxuICAgIGlmKGZpbmQpe1xuICAgICAgICBmaW5kLmxpa2VkID0gc2hvdC5saWtlZFxuICAgICAgICBmaW5kLnNhdmVkID0gc2hvdC5zYXZlZFxuXG4gICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdzaG90c19mYXZvcml0ZScsIHNob3RzLmZhdm9yaXRlKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlKCl7XG4gICAgQXBpLnNob3RzTGlzdCgnZmF2b3JpdGUnLCAxLCAoc2hvdHMpPT57XG4gICAgICAgIHNob3RzLmZhdm9yaXRlID0gc2hvdHMucmVzdWx0c1xuXG4gICAgICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdzaG90c19mYXZvcml0ZScsIHNob3RzLmZhdm9yaXRlKVxuICAgIH0pXG5cbiAgICBBcGkuc2hvdHNMaXN0KCdtYXAnLCAxLCAobWFwKT0+e1xuICAgICAgICBjcmVhdGVNYXAobWFwLnJlc3VsdHMpXG5cbiAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ3Nob3RzX21hcCcsIG1hcC5yZXN1bHRzKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGFkZChzaG90KXtcbiAgICBsZXQgY2xvbmUgPSB7fVxuXG4gICAgT2JqZWN0LmFzc2lnbihjbG9uZSwgc2hvdClcblxuICAgIGRlbGV0ZSBjbG9uZS5wYXJhbXNcblxuICAgIExhbXBhLkFycmF5cy5pbnNlcnQoc2hvdHMuZmF2b3JpdGUsIDAsIGNsb25lKVxuXG4gICAgaWYoc2hvdHMuZmF2b3JpdGUubGVuZ3RoID4gMjApe1xuICAgICAgICBzaG90cy5mYXZvcml0ZSA9IHNob3RzLmZhdm9yaXRlLnNsaWNlKDAsMjApXG4gICAgfVxuXG4gICAgc2hvdHMubWFwW2Nsb25lLmlkXSA9IDFcblxuICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdzaG90c19mYXZvcml0ZScsIHNob3RzLmZhdm9yaXRlKVxuXG4gICAgTGFtcGEuU3RvcmFnZS5hZGQoJ3Nob3RzX21hcCcsIGNsb25lLmlkKVxufVxuXG5mdW5jdGlvbiByZW1vdmUoc2hvdCl7XG4gICAgbGV0IGZpbmRfaW4gPSBzaG90cy5mYXZvcml0ZS5maW5kKGE9PmEuaWQgPT0gc2hvdC5pZClcblxuICAgIGlmKGZpbmRfaW4pIExhbXBhLkFycmF5cy5yZW1vdmUoc2hvdHMuZmF2b3JpdGUsIGZpbmRfaW4pXG5cbiAgICBkZWxldGUgc2hvdHMubWFwW3Nob3QuaWRdXG5cbiAgICBMYW1wYS5TdG9yYWdlLnNldCgnc2hvdHNfZmF2b3JpdGUnLCBzaG90cy5mYXZvcml0ZSlcblxuICAgIGxldCBtYXAgPSBMYW1wYS5TdG9yYWdlLmdldCgnc2hvdHNfbWFwJywgJ1tdJylcbiAgICBcbiAgICBMYW1wYS5BcnJheXMucmVtb3ZlKG1hcCwgc2hvdC5pZClcblxuICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdzaG90c19tYXAnLCBtYXApXG59XG5cbmZ1bmN0aW9uIHBhZ2UocGFnZSwgY2FsbGJhY2spe1xuICAgIEFwaS5zaG90c0xpc3QoJ2Zhdm9yaXRlJywgcGFnZSwgKHNob3RzKT0+e1xuICAgICAgICBjYWxsYmFjayhzaG90cy5yZXN1bHRzKVxuICAgIH0sICgpPT57XG4gICAgICAgIGNhbGxiYWNrKFtdKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGdldCgpe1xuICAgIHJldHVybiBMYW1wYS5BcnJheXMuY2xvbmUoc2hvdHMuZmF2b3JpdGUpXG59XG5cbmZ1bmN0aW9uIGZpbmQoc2hvdF9pZCl7XG4gICAgcmV0dXJuIEJvb2xlYW4oc2hvdHMubWFwW3Nob3RfaWRdKVxufVxuXG5mdW5jdGlvbiB0b2dnbGUoc2hvdCwgb25zdWNjZXNzLCBvbmVycm9yKXtcbiAgICBsZXQgZmluZGVkID0gZmluZChzaG90LmlkKVxuXG4gICAgQXBpLnNob3RzRmF2b3JpdGUoZmluZGVkID8gJ3JlbW92ZScgOiAnYWRkJywgc2hvdCwgKCk9PntcbiAgICAgICAgaWYoZmluZGVkKXtcbiAgICAgICAgICAgIHJlbW92ZShzaG90KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWRkKHNob3QpXG4gICAgICAgIH1cblxuICAgICAgICBpZihvbnN1Y2Nlc3MpIG9uc3VjY2VzcyhmaW5kZWQpXG5cbiAgICAgICAgTGFtcGEuU29ja2V0LnNlbmQoJ3VwZGF0ZScsIHtwYXJhbXM6IHtmcm9tOiAnc2hvdHMnLCBsaXN0OiAnZmF2b3JpdGUnfX0pXG4gICAgfSwgb25lcnJvcilcblxuICAgIHJldHVybiAhZmluZGVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0LFxuICAgIHVwZGF0ZSxcbiAgICByZW1vdmUsXG4gICAgYWRkLFxuICAgIGdldCxcbiAgICBmaW5kLFxuICAgIHRvZ2dsZSxcbiAgICBwYWdlXG59IiwiaW1wb3J0IEFwaSBmcm9tICcuL2FwaS5qcydcblxubGV0IGxvYWRlZF9sYXN0ID0ge31cblxuZnVuY3Rpb24gc3RhcnQoY2FsbCl7XG4gICAgbGV0IHN0YXR1cyA9IG5ldyBMYW1wYS5TdGF0dXMoMylcbiAgICAgICAgc3RhdHVzLm9uQ29tcGxpdGUgPSAoKT0+e1xuICAgICAgICAgICAgLy8g0KHQvtGF0YDQsNC90Y/QtdC8INC/0L7RgdC70LXQtNC90LjQtSDQt9Cw0LPRgNGD0LbQtdC90L3Ri9C1INGI0L7RgtGLINC00LvRjyDRhNC40LvRjNGC0YDQsNGG0LjQuCDRgNC10LvQtdCy0LDQvdGC0L3Ri9GFXG4gICAgICAgICAgICBsb2FkZWRfbGFzdC5uZXcgICAgID0gc3RhdHVzLmRhdGEubmV3XG4gICAgICAgICAgICBsb2FkZWRfbGFzdC5wb3B1bGFyID0gc3RhdHVzLmRhdGEucG9wdWxhclxuXG4gICAgICAgICAgICAvLyDQpNC40LvRjNGC0YDRg9C10Lwg0L/RgNC+0YHQvNC+0YLRgNC10L3QvdGL0LUg0YjQvtGC0YtcbiAgICAgICAgICAgIHN0YXR1cy5kYXRhLm5ldyAgICAgPSBmaWx0ZXJWaWV3ZWQoc3RhdHVzLmRhdGEubmV3KVxuICAgICAgICAgICAgc3RhdHVzLmRhdGEucG9wdWxhciA9IGZpbHRlclZpZXdlZChzdGF0dXMuZGF0YS5wb3B1bGFyKVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2hvdHMnLCAncm9sbCBpdGVtcycsICduZXcnLCBzdGF0dXMuZGF0YS5uZXcubGVuZ3RoLCAncG9wdWxhcicsIHN0YXR1cy5kYXRhLnBvcHVsYXIubGVuZ3RoLCAnb2xkJywgc3RhdHVzLmRhdGEub2xkLmxlbmd0aClcblxuICAgICAgICAgICAgLy8g0KPQsdC40YDQsNC10Lwg0LTRg9Cx0LvQuCDQvNC10LbQtNGDINC90L7QstGL0LzQuCDQuCDQv9C+0L/Rg9C70Y/RgNC90YvQvNC4INC4INGB0YLQsNGA0YvQvNC4XG4gICAgICAgICAgICBzdGF0dXMuZGF0YS5wb3B1bGFyID0gc3RhdHVzLmRhdGEucG9wdWxhci5maWx0ZXIoYT0+IXN0YXR1cy5kYXRhLm5ldy5maW5kKGI9PmIuaWQgPT0gYS5pZCkpXG4gICAgICAgICAgICBzdGF0dXMuZGF0YS5vbGQgICAgID0gc3RhdHVzLmRhdGEub2xkLmZpbHRlcihhPT4hKHN0YXR1cy5kYXRhLm5ldy5maW5kKGI9PmIuaWQgPT0gYS5pZCkgfHwgc3RhdHVzLmRhdGEucG9wdWxhci5maW5kKGI9PmIuaWQgPT0gYS5pZCkpKVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2hvdHMnLCAnYWZ0ZXIgZmlsdGVyIHJvbGwgaXRlbXMnLCAnbmV3Jywgc3RhdHVzLmRhdGEubmV3Lmxlbmd0aCwgJ3BvcHVsYXInLCBzdGF0dXMuZGF0YS5wb3B1bGFyLmxlbmd0aCwgJ29sZCcsIHN0YXR1cy5kYXRhLm9sZC5sZW5ndGgpXG5cbiAgICAgICAgICAgIC8vINCh0L7QsdC40YDQsNC10Lwg0LjRgtC+0LPQvtCy0YvQuSDRgdC/0LjRgdC+0LpcbiAgICAgICAgICAgIGxldCBpdGVtcyA9IFtdLmNvbmNhdChzdGF0dXMuZGF0YS5uZXcsIHN0YXR1cy5kYXRhLnBvcHVsYXIpXG5cbiAgICAgICAgICAgIC8vINCf0LXRgNC10LzQtdGI0LjQstCw0LXQvCDQvdC+0LLRi9C1INC4INC/0L7Qv9GD0LvRj9GA0L3Ri9C1XG4gICAgICAgICAgICBpdGVtcyA9IExhbXBhLkFycmF5cy5zaHVmZmxlKGl0ZW1zKVxuXG4gICAgICAgICAgICAvLyDQlNC+0LHQsNCy0LvRj9C10Lwg0LzQtdGC0LrRgyBmcm9tX2lkINC00LvRjyDRgdGC0LDRgNGL0YUg0YjQvtGC0L7QslxuICAgICAgICAgICAgc3RhdHVzLmRhdGEub2xkLmZvckVhY2goYT0+YS5mcm9tX2lkID0gYS5pZClcblxuICAgICAgICAgICAgLy8g0JTQvtCx0LDQstC70Y/QtdC8INGA0LXQu9C10LLQsNC90YLQvdGL0LUg0YHRgtCw0YDRi9C1INGI0L7RgtGLXG4gICAgICAgICAgICBpdGVtcyA9IGl0ZW1zLmNvbmNhdChmaWx0ZXJWaWV3ZWQoZmlsdGVyUmVsZXZhbnQoc3RhdHVzLmRhdGEub2xkKSkpXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTaG90cycsICdyZWxldmFudCByb2xsIGl0ZW1zJywgaXRlbXMubGVuZ3RoKVxuXG4gICAgICAgICAgICAvLyDQldGB0LvQuCDQvdC10YIg0YjQvtGC0L7Qsiwg0LTQvtCx0LDQstC70Y/QtdC8INC90LXRgdC60L7Qu9GM0LrQviDRgdGC0LDRgNGL0YVcbiAgICAgICAgICAgIGlmKCFpdGVtcy5sZW5ndGgpIGl0ZW1zID0gc3RhdHVzLmRhdGEub2xkLnNsaWNlKC01KVxuXG4gICAgICAgICAgICBjYWxsKGl0ZW1zKVxuICAgICAgICB9XG5cbiAgICBBcGkubGVudGEoe3NvcnQ6ICduZXcnLCBsaW1pdDogNTB9LCBzdGF0dXMuYXBwZW5kLmJpbmQoc3RhdHVzLCAnbmV3JykpXG4gICAgQXBpLmxlbnRhKHtzb3J0OiAncG9wdWxhcicsIGxpbWl0OiA1MH0sIHN0YXR1cy5hcHBlbmQuYmluZChzdGF0dXMsICdwb3B1bGFyJykpXG4gICAgQXBpLmxlbnRhKHtzb3J0OiAnZnJvbV9pZCcsIGlkOiBMYW1wYS5TdG9yYWdlLmdldCgnc2hvdHNfbGVudGFfbGFzdF9pZCcsJzAnKSwgbGltaXQ6IDUwfSwgc3RhdHVzLmFwcGVuZC5iaW5kKHN0YXR1cywgJ29sZCcpKVxufVxuXG5mdW5jdGlvbiBmaWx0ZXJSZWxldmFudChpdGVtcyl7XG4gICAgcmV0dXJuIGl0ZW1zLmZpbHRlcihhPT4hKGxvYWRlZF9sYXN0Lm5ldy5maW5kKGI9PmIuaWQgPT0gYS5pZCkgfHwgbG9hZGVkX2xhc3QucG9wdWxhci5maW5kKGI9PmIuaWQgPT0gYS5pZCkpKVxufVxuXG5mdW5jdGlvbiBmaWx0ZXJWaWV3ZWQoaXRlbXMpe1xuICAgIGxldCB2aWV3ZWQgID0gTGFtcGEuU3RvcmFnZS5jYWNoZSgnc2hvdHNfdmlld2VkJywgMjAwMCwgW10pXG4gICAgbGV0IGZpbHRyZWQgPSBpdGVtcy5maWx0ZXIoYT0+dmlld2VkLmluZGV4T2YoYS5pZCkgPT0gLTEpXG5cbiAgICByZXR1cm4gZmlsdHJlZFxufVxuXG5mdW5jdGlvbiBuZXh0KGNhbGwpe1xuICAgIEFwaS5sZW50YSh7c29ydDogJ2Zyb21faWQnLCBpZDogTGFtcGEuU3RvcmFnZS5nZXQoJ3Nob3RzX2xlbnRhX2xhc3RfaWQnLCcwJyksIGxpbWl0OiA1MH0sIChpdGVtcyk9PmNhbGwoZmlsdGVyUmVsZXZhbnQoaXRlbXMpKSlcbn1cblxuZnVuY3Rpb24gdmlld2VkUmVnaXN0ZXIoc2hvdCl7XG4gICAgaWYoIXNob3QuZnJvbV9pZCkgTGFtcGEuU3RvcmFnZS5hZGQoJ3Nob3RzX3ZpZXdlZCcsIHNob3QuaWQpXG5cbiAgICBBcGkuc2hvdHNWaWV3ZWQoc2hvdC5pZClcbn1cblxuZnVuY3Rpb24gc2F2ZUZyb21JZChpZCl7XG4gICAgTGFtcGEuU3RvcmFnZS5zZXQoJ3Nob3RzX2xlbnRhX2xhc3RfaWQnLCBpZClcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHN0YXJ0LFxuICAgIG5leHQsXG4gICAgdmlld2VkUmVnaXN0ZXIsXG4gICAgc2F2ZUZyb21JZFxufSIsImltcG9ydCBSb2xsIGZyb20gJy4uL3V0aWxzL3JvbGwuanMnXG5cbmZ1bmN0aW9uIFZpZGVvKCl7XG4gICAgdGhpcy5odG1sICAgICA9IExhbXBhLlRlbXBsYXRlLmpzKCdzaG90c19sZW50YV92aWRlbycpXG4gICAgdGhpcy52aWRlbyAgICA9IHRoaXMuaHRtbC5maW5kKCd2aWRlbycpXG4gICAgdGhpcy5wcm9ncmVzcyA9IHRoaXMuaHRtbC5maW5kKCcuc2hvdHMtbGVudGEtdmlkZW9fX3Byb2dyZXNzLWJhciBkaXYnKVxuICAgIHRoaXMubGF5ZXIgICAgPSB0aGlzLmh0bWwuZmluZCgnLnNob3RzLWxlbnRhLXZpZGVvX19sYXllcicpXG4gICAgdGhpcy5sb2FkZXIgICA9IHRoaXMuaHRtbC5maW5kKCcuc2hvdHMtbGVudGEtdmlkZW9fX2xvYWRlcicpXG4gICAgdGhpcy52aWV3ZWQgICA9IHt9XG5cbiAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsICgpPT57XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLnN0eWxlLndpZHRoID0gKHRoaXMudmlkZW8uY3VycmVudFRpbWUgLyB0aGlzLnZpZGVvLmR1cmF0aW9uICogMTAwKSArICclJ1xuXG4gICAgICAgICAgICBpZigodGhpcy52aWRlby5jdXJyZW50VGltZSAvIHRoaXMudmlkZW8uZHVyYXRpb24gPiAwLjEgfHwgdGhpcy52aWRlby5jdXJyZW50VGltZSA+IDIpICYmICF0aGlzLnZpZXdlZFt0aGlzLnNob3QuaWRdKXtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdlZFt0aGlzLnNob3QuaWRdID0gdHJ1ZVxuXG4gICAgICAgICAgICAgICAgUm9sbC52aWV3ZWRSZWdpc3Rlcih0aGlzLnNob3QpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIExhbXBhLlNjcmVlbnNhdmVyLnJlc2V0VGltZXIoKVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignd2FpdGluZycsICgpPT57XG4gICAgICAgICAgICB0aGlzLnNob3dMb2FkaW5nKClcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5oaWRlTG9hZGluZygpXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5sYXllci5vbignY2xpY2snLCgpPT57XG4gICAgICAgICAgICB0aGlzLnZpZGVvLnBhdXNlZCA/IHRoaXMucGxheSgpIDogdGhpcy5wYXVzZSgpXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYoTGFtcGEuUGxhdGZvcm0uaXMoJ2FwcGxlJykpIHRoaXMudmlkZW8uc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJylcbiAgICB9XG5cbiAgICB0aGlzLmNoYW5nZSA9IGZ1bmN0aW9uKHNob3Qpe1xuICAgICAgICB0aGlzLnNob3QgPSBzaG90XG5cbiAgICAgICAgaWYoc2hvdC5mcm9tX2lkKSBSb2xsLnNhdmVGcm9tSWQoc2hvdC5mcm9tX2lkKVxuXG4gICAgICAgIHRoaXMudmlkZW8uc2V0QXR0cmlidXRlKCdwb3N0ZXInLCBzaG90LmltZyB8fCAnLi9pbWcvdmlkZW9fcG9zdGVyLnBuZycpXG4gICAgICAgIHRoaXMucHJvZ3Jlc3Muc3R5bGUud2lkdGggPSAnMCUnXG5cbiAgICAgICAgdGhpcy5wYXVzZSgpXG4gICAgICAgIHRoaXMubG9hZCgpXG4gICAgICAgIHRoaXMucGxheSgpXG4gICAgfVxuXG4gICAgdGhpcy5wbGF5ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IHBsYXlQcm9taXNlXG5cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgcGxheVByb21pc2UgPSB0aGlzLnZpZGVvLnBsYXkoKVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGUpeyB9XG5cblxuICAgICAgICBpZiAocGxheVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGxheVByb21pc2UudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMZW50YScsJ3N0YXJ0IHBsYWluaW5nJylcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMZW50YScsJ3BsYXkgcHJvbWlzZSBlcnJvcjonLCBlLm1lc3NhZ2UpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wYXVzZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGxldCBwYXVzZVByb21pc2VcblxuICAgICAgICB0cnl7XG4gICAgICAgICAgICBwYXVzZVByb21pc2UgPSB0aGlzLnZpZGVvLnBhdXNlKClcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlKXsgfVxuXG4gICAgICAgIGlmIChwYXVzZVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGF1c2VQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTGVudGEnLCdwYXVzZScpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMZW50YScsJ3BhdXNlIHByb21pc2UgZXJyb3I6JywgZS5tZXNzYWdlKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubG9hZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMudmlkZW8uc3JjID0gJydcbiAgICAgICAgdGhpcy52aWRlby5sb2FkKClcblxuICAgICAgICB0aGlzLnZpZGVvLnNyYyA9IHRoaXMuc2hvdC5maWxlXG4gICAgICAgIHRoaXMudmlkZW8ubG9hZCgpXG4gICAgfVxuXG4gICAgdGhpcy5zaG93TG9hZGluZyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMudGltZXJfbG9hZGluZyA9IHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgIHRoaXMubG9hZGVyLmFkZENsYXNzKCdzaG93JylcbiAgICAgICAgfSwyMDAwKVxuICAgIH1cblxuICAgIHRoaXMuaGlkZUxvYWRpbmcgPSBmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcl9sb2FkaW5nKVxuXG4gICAgICAgIHRoaXMubG9hZGVyLnJlbW92ZUNsYXNzKCdzaG93JylcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmh0bWxcbiAgICB9XG5cbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcl9sb2FkaW5nKVxuXG4gICAgICAgIHRoaXMuaHRtbC5yZW1vdmUoKVxuXG4gICAgICAgIHRoaXMudmlld2VkID0ge31cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZpZGVvIiwiZnVuY3Rpb24gQXV0aG9yKGF1dGhvcl9kYXRhID0gZmFsc2Upe1xuICAgIHRoaXMuaHRtbCA9IExhbXBhLlRlbXBsYXRlLmpzKCdzaG90c19hdXRob3InKVxuICAgIHRoaXMuaW1nICA9IHRoaXMuaHRtbC5maW5kKCdpbWcnKVxuICAgIHRoaXMuYm94ICA9IHRoaXMuaHRtbC5maW5kKCcuc2hvdHMtYXV0aG9yX19pbWcnKVxuXG4gICAgdGhpcy5pbWcub25sb2FkID0gKCk9PntcbiAgICAgICAgdGhpcy5ib3guYWRkQ2xhc3MoJ2xvYWRlZCcpXG4gICAgfVxuXG4gICAgdGhpcy5pbWcub25lcnJvciA9ICgpPT57XG4gICAgICAgIHRoaXMuaW1nLnNyYyA9ICcuL2ltZy9pbWdfYnJva2VuLnN2ZydcbiAgICB9XG5cbiAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKGF1dGhvcl9kYXRhKSB0aGlzLnVwZGF0ZShhdXRob3JfZGF0YSlcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICB0aGlzLmJveC5yZW1vdmVDbGFzcygnbG9hZGVkJylcblxuICAgICAgICBsZXQgZW1haWwgPSBkYXRhLmVtYWlsXG4gICAgICAgIGxldCBpY29uICA9IGRhdGEuaWNvblxuXG4gICAgICAgIGlmKCFlbWFpbCl7XG4gICAgICAgICAgICBlbWFpbCA9IExhbXBhLkFjY291bnQuUGVybWl0LmFjY291bnQuZW1haWxcbiAgICAgICAgICAgIGljb24gID0gTGFtcGEuQWNjb3VudC5QZXJtaXQuYWNjb3VudC5wcm9maWxlID8gTGFtcGEuQWNjb3VudC5QZXJtaXQuYWNjb3VudC5wcm9maWxlLmljb24gOiAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbWcuc3JjID0gIExhbXBhLlV0aWxzLnByb3RvY29sKCkgKyBMYW1wYS5NYW5pZmVzdC5jdWJfZG9tYWluICsgJy9pbWcvcHJvZmlsZXMvJyArIChpY29uIHx8ICdsXzEnKSArICcucG5nJ1xuXG4gICAgICAgIHRoaXMuaHRtbC5maW5kKCcuc2hvdHMtYXV0aG9yX19uYW1lJykudGV4dChMYW1wYS5VdGlscy5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoKGVtYWlsIHx8ICdVbmtub3duJykuc3BsaXQoJ0AnKVswXSkpXG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXIgPSBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5odG1sXG4gICAgfVxuXG4gICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5pbWcub25sb2FkID0gbnVsbFxuICAgICAgICB0aGlzLmltZy5vbmVycm9yID0gbnVsbFxuXG4gICAgICAgIHRoaXMuaHRtbC5yZW1vdmUoKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXV0aG9yIiwiaW1wb3J0IEFwaSBmcm9tICcuL2FwaS5qcydcblxuZnVuY3Rpb24gZmluZChzaG90X2lkKXtcbiAgICByZXR1cm4gQm9vbGVhbihMYW1wYS5TdG9yYWdlLmdldCgnc2hvdHNfbGlrZXMnLCAnW10nKS5maW5kKGlkPT5zaG90X2lkID09IGlkKSlcbn1cblxuZnVuY3Rpb24gYWRkKHNob3RfaWQpe1xuICAgIGxldCBhcnIgPSBMYW1wYS5TdG9yYWdlLmNhY2hlKCdzaG90c19saWtlcycsIDEwMCwgJ1tdJylcbiAgICAgICAgYXJyLnB1c2goc2hvdF9pZClcblxuICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdzaG90c19saWtlcycsIGFycilcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKHNob3RfaWQpe1xuICAgIGxldCBhcnIgPSBMYW1wYS5TdG9yYWdlLmdldCgnc2hvdHNfbGlrZXMnLCdbXScpXG5cbiAgICBMYW1wYS5BcnJheXMucmVtb3ZlKGFyciwgc2hvdF9pZClcblxuICAgIExhbXBhLlN0b3JhZ2Uuc2V0KCdzaG90c19saWtlcycsIGFycilcbn1cblxuZnVuY3Rpb24gdG9nZ2xlKHNob3RfaWQsIG9uc3VjY2Vzcywgb25lcnJvcil7XG4gICAgbGV0IGZpbmRlZCA9IGZpbmQoc2hvdF9pZClcblxuICAgIEFwaS5zaG90c0xpa2VkKHNob3RfaWQsIGZpbmRlZCA/ICd1bmxpa2UnIDogJ2xpa2UnLCAoKT0+e1xuICAgICAgICBpZihmaW5kZWQpe1xuICAgICAgICAgICAgcmVtb3ZlKHNob3RfaWQpXG4gICAgICAgIH0gXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWRkKHNob3RfaWQpXG4gICAgICAgIH1cblxuICAgICAgICBpZihvbnN1Y2Nlc3MpIG9uc3VjY2VzcyhmaW5kZWQpXG4gICAgfSwgb25lcnJvcilcblxuICAgIHJldHVybiAhZmluZGVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBmaW5kLFxuICAgIGFkZCxcbiAgICByZW1vdmUsXG4gICAgdG9nZ2xlXG59IiwiaW1wb3J0IEFwaSBmcm9tIFwiLi9hcGkuanNcIlxuXG5mdW5jdGlvbiBzaG90c1JlcG9ydChpZCwgY2FsbGJhY2spIHtcbiAgICBMYW1wYS5Nb2RhbC5vcGVuKHtcbiAgICAgICAgaHRtbDogTGFtcGEuVGVtcGxhdGUuZ2V0KCdzaG90c19tb2RhbF9yZXBvcnQnKSxcbiAgICAgICAgc2l6ZTogJ3NtYWxsJyxcbiAgICAgICAgc2Nyb2xsOiB7XG4gICAgICAgICAgICBub3BhZGRpbmc6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c19idXR0b25fcmVwb3J0JyksXG4gICAgICAgICAgICAgICAgb25TZWxlY3Q6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgIExhbXBhLk1vZGFsLmNsb3NlKClcblxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcG9ydHMgPSBMYW1wYS5TdG9yYWdlLmdldCgnc2hvdHNfcmVwb3J0cycsICdbXScpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYocmVwb3J0cy5pbmRleE9mKGlkKSA9PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBBcGkuc2hvdHNSZXBvcnQoaWQsICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0cy5wdXNoKGlkKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuU3RvcmFnZS5zZXQoJ3Nob3RzX3JlcG9ydHMnLCByZXBvcnRzKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuQmVsbC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJzxzdmc+PHVzZSB4bGluazpocmVmPVwiI3Nwcml0ZS1zaG90c1wiPjwvdXNlPjwvc3ZnPicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c19tb2RhbF9yZXBvcnRfYmVsbCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLkJlbGwucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJzxzdmc+PHVzZSB4bGluazpocmVmPVwiI3Nwcml0ZS1zaG90c1wiPjwvdXNlPjwvc3ZnPicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX21vZGFsX3JlcG9ydF9iZWxsX2FscmVhZHllZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBvbkJhY2s6ICgpPT57XG4gICAgICAgICAgICBMYW1wYS5Nb2RhbC5jbG9zZSgpXG5cbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHNob3RzRGVsZXRlKGlkLCBjYWxsYmFjaykge1xuICAgIExhbXBhLk1vZGFsLm9wZW4oe1xuICAgICAgICBodG1sOiBMYW1wYS5UZW1wbGF0ZS5nZXQoJ3Nob3RzX21vZGFsX2RlbGV0ZScpLFxuICAgICAgICBzaXplOiAnc21hbGwnLFxuICAgICAgICBzY3JvbGw6IHtcbiAgICAgICAgICAgIG5vcGFkZGluZzogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX2J1dHRvbl9kZWxldGVfdmlkZW8nKSxcbiAgICAgICAgICAgICAgICBvblNlbGVjdDogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgTGFtcGEuTW9kYWwuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZGVsZXRlZCA9IExhbXBhLlN0b3JhZ2UuZ2V0KCdzaG90c19kZWxldGVkJywgJ1tdJylcblxuICAgICAgICAgICAgICAgICAgICBpZihkZWxldGVkLmluZGV4T2YoaWQpID09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFwaS5zaG90c0RlbGV0ZShpZCwgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVkLnB1c2goaWQpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5TdG9yYWdlLnNldCgnc2hvdHNfZGVsZXRlZCcsIGRlbGV0ZWQpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5CZWxsLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnPHN2Zz48dXNlIHhsaW5rOmhyZWY9XCIjc3ByaXRlLXNob3RzXCI+PC91c2U+PC9zdmc+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX21vZGFsX2RlbGV0ZWRfYmVsbCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLkJlbGwucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJzxzdmc+PHVzZSB4bGluazpocmVmPVwiI3Nwcml0ZS1zaG90c1wiPjwvdXNlPjwvc3ZnPicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX21vZGFsX2RlbGV0ZWRfYmVsbCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBvbkJhY2s6ICgpPT57XG4gICAgICAgICAgICBMYW1wYS5Nb2RhbC5jbG9zZSgpXG5cbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBzaG90c1JlcG9ydCxcbiAgICBzaG90c0RlbGV0ZVxufSIsImZ1bmN0aW9uIGJhY2t3YXJkKCl7XG4gICAgbGV0IGhlYWQgPSBMYW1wYS5UZW1wbGF0ZS5nZXQoJ2hlYWRfYmFja3dhcmQnLHt0aXRsZTogJyd9KVxuXG4gICAgaGVhZC5maW5kKCcuaGVhZC1iYWNrd2FyZF9fYnV0dG9uJykub24oJ2NsaWNrJywoKT0+e1xuICAgICAgICBMYW1wYS5Db250cm9sbGVyLmJhY2soKVxuICAgIH0pXG5cbiAgICByZXR1cm4gaGVhZFxufVxuXG5mdW5jdGlvbiBTbGlkZXMocGFyYW1zKXtcbiAgICBsZXQgaHRtbCA9ICQoYDxkaXYgY2xhc3M9XCJzaG90cy1zbGlkZXNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNob3RzLXNsaWRlc19fc2xpZGVzXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzaG90cy1zbGlkZXNfX2luc3RhbGxcIj4ke0xhbXBhLkxhbmcudHJhbnNsYXRlKHBhcmFtcy5idXR0b25fdGV4dCl9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzaG90cy1zbGlkZXNfX2Rvd25cIj4ke0xhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c19kb3duJyl9PC9kaXY+XG4gICAgPC9kaXY+YClcblxuICAgIHBhcmFtcy5zbGlkZXMuZm9yRWFjaCgoc2xpZGVfZGF0YSwgc2xpZGVfaW5kZXgpPT57XG4gICAgICAgIGh0bWwuZmluZCgnLnNob3RzLXNsaWRlc19fc2xpZGVzJykuYXBwZW5kKCQoYDxpbWcgY2xhc3M9XCJzaG90cy1zbGlkZXNfX3NsaWRlIHNsaWRlLSR7c2xpZGVfaW5kZXggKyAxfVwiPmApKVxuICAgIH0pXG5cbiAgICBsZXQgc2xpZGUgICA9IDBcbiAgICBsZXQgdG90YWwgICA9IHBhcmFtcy5zbGlkZXMubGVuZ3RoXG4gICAgbGV0IHRpbWVsb2FkXG4gICAgbGV0IGNhbmNlbCAgPSBmYWxzZVxuICAgIGxldCBkb3duICAgID0gaHRtbC5maW5kKCcuc2hvdHMtc2xpZGVzX19kb3duJylcbiAgICBsZXQgaW5zdGFsbCA9IGh0bWwuZmluZCgnLnNob3RzLXNsaWRlc19faW5zdGFsbCcpXG5cbiAgICBpZihMYW1wYS5QbGF0Zm9ybS5tb3VzZSgpIHx8IExhbXBhLlV0aWxzLmlzVG91Y2hEZXZpY2UoKSl7XG4gICAgICAgIGh0bWwuYXBwZW5kKGJhY2t3YXJkKCkpXG4gICAgfVxuXG4gICAgJCgnYm9keScpLmFwcGVuZChodG1sKVxuXG4gICAgbGV0IHB1c2ggPSAoKT0+e1xuICAgICAgICBpZihzbGlkZSA9PSB0b3RhbCl7XG4gICAgICAgICAgICBkZXN0cm95KClcblxuICAgICAgICAgICAgcGFyYW1zLm9uSW5zdGFsbCAmJiBwYXJhbXMub25JbnN0YWxsKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCBuZXh0ID0gKCk9PntcbiAgICAgICAgaWYoIHNsaWRlID49IHRvdGFsICkgcmV0dXJuXG5cbiAgICAgICAgaWYoc2xpZGUgPiAwKXtcbiAgICAgICAgICAgIGh0bWwuZmluZCgnLnNsaWRlLScgKyBzbGlkZSkuYWRkQ2xhc3MoJ3VwJylcbiAgICAgICAgfVxuXG4gICAgICAgIHNsaWRlKytcblxuICAgICAgICBodG1sLmZpbmQoJy5zbGlkZS0nICsgc2xpZGUpLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gICAgICAgIGlmKHNsaWRlID09PSB0b3RhbCl7XG4gICAgICAgICAgICBkb3duLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICAgICAgaW5zdGFsbC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgIH0sNTAwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHN0YXJ0ID0gKCk9PntcbiAgICAgICAgTGFtcGEuTG9hZGluZy5zdG9wKClcblxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICBkb3duLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICB9LDYwMClcblxuICAgICAgICBuZXh0KClcblxuICAgICAgICBMYW1wYS5Db250cm9sbGVyLmFkZCgnc2hvdHNfcHJlc2VudCcsIHtcbiAgICAgICAgICAgIHRvZ2dsZTogKCk9PntcbiAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLmNsZWFyKClcblxuICAgICAgICAgICAgICAgIExhbXBhLkJhY2tncm91bmQudGhlbWUoJyMwODA5MEQnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudGVyOiBwdXNoLFxuICAgICAgICAgICAgZG93bjogbmV4dCxcbiAgICAgICAgICAgIGJhY2s6IHN0b3AsXG4gICAgICAgIH0pXG5cbiAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ3Nob3RzX3ByZXNlbnQnKVxuICAgIH1cblxuICAgIGxldCBzdG9wID0gKCk9PntcbiAgICAgICAgZGVzdHJveSgpXG5cbiAgICAgICAgTGFtcGEuTG9hZGluZy5zdG9wKClcblxuICAgICAgICBwYXJhbXMub25CYWNrICYmIHBhcmFtcy5vbkJhY2soKVxuICAgIH1cblxuICAgIGxldCBwcmVsb2FkID0gKCk9PntcbiAgICAgICAgbGV0IHNsaWRlc19sb2FkZWQgPSAwXG5cbiAgICAgICAgZm9yKGxldCBpPTE7IGk8PXRvdGFsOyBpKyspe1xuICAgICAgICAgICAgbGV0IGltZyA9IGh0bWwuZmluZCgnLnNsaWRlLScgKyBpKVswXVxuICAgICAgICAgICAgaW1nLnNyYyA9IHBhcmFtcy5zbGlkZXNbaS0xXVxuICAgICAgICAgICAgaW1nLm9ubG9hZCA9ICgpPT57XG4gICAgICAgICAgICAgICAgc2xpZGVzX2xvYWRlZCsrXG5cbiAgICAgICAgICAgICAgICBpZihzbGlkZXNfbG9hZGVkID09PSB0b3RhbCAmJiAhY2FuY2VsKXtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLm9uTG9hZCAmJiBwYXJhbXMub25Mb2FkKClcblxuICAgICAgICAgICAgICAgICAgICBzdGFydCgpXG5cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVsb2FkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWVsb2FkID0gc2V0VGltZW91dChzdG9wLDEwMDAwKVxuICAgIH1cblxuICAgIGxldCBkZXN0cm95ID0gKCk9PntcbiAgICAgICAgc3RhcnQgPSAoKT0+e31cblxuICAgICAgICBjYW5jZWwgPSB0cnVlXG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVsb2FkKVxuXG4gICAgICAgIGh0bWwucmVtb3ZlKClcblxuICAgICAgICBMYW1wYS5CYWNrZ3JvdW5kLnRoZW1lKCdyZXNldCcpXG4gICAgfVxuXG4gICAgZG93bi5vbignY2xpY2snLCBuZXh0KVxuICAgIFxuICAgIGluc3RhbGwub24oJ2NsaWNrJywgcHVzaClcblxuICAgIExhbXBhLkxvYWRpbmcuc3RhcnQoc3RvcClcblxuICAgIHByZWxvYWQoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBTbGlkZXMiLCJpbXBvcnQgVGFncyBmcm9tICcuLi9jb21wb25lbnRzL3RhZ3MuanMnXG5pbXBvcnQgQXV0aG9yIGZyb20gJy4uL2NvbXBvbmVudHMvYXV0aG9yLmpzJ1xuaW1wb3J0IExpa2VzIGZyb20gJy4uL3V0aWxzL2xpa2VzLmpzJ1xuaW1wb3J0IEZhdm9yaXRlIGZyb20gJy4uL3V0aWxzL2Zhdm9yaXRlLmpzJ1xuaW1wb3J0IE1vZGFscyBmcm9tICcuLi91dGlscy9tb2RhbHMuanMnXG5pbXBvcnQgQ3JlYXRlZCBmcm9tICcuLi91dGlscy9jcmVhdGVkLmpzJ1xuaW1wb3J0IFNsaWRlcyBmcm9tICcuLi9jb21wb25lbnRzL3NsaWRlcy5qcydcbmltcG9ydCBEZWZpbmVkIGZyb20gJy4uL2RlZmluZWQuanMnXG5cbmZ1bmN0aW9uIFBhbmVsKCl7XG4gICAgdGhpcy5odG1sICAgID0gTGFtcGEuVGVtcGxhdGUuanMoJ3Nob3RzX2xlbnRhX3BhbmVsJylcbiAgICB0aGlzLm5ldHdvcmsgPSBuZXcgTGFtcGEuUmVndWVzdCgpXG4gICAgdGhpcy5jYWNoZSAgID0ge31cblxuICAgIHRoaXMuaW1hZ2UgICA9IHRoaXMuaHRtbC5maW5kKCcuc2hvdHMtbGVudGEtcGFuZWxfX2NhcmQtaW1nJylcbiAgICB0aGlzLnRpdGxlICAgPSB0aGlzLmh0bWwuZmluZCgnLnNob3RzLWxlbnRhLXBhbmVsX19jYXJkLXRpdGxlJylcbiAgICB0aGlzLnJlY29yZGVyPSB0aGlzLmh0bWwuZmluZCgnLnNob3RzLWxlbnRhLXBhbmVsX19yZWNvcmRlcicpXG4gICAgdGhpcy55ZWFyICAgID0gdGhpcy5odG1sLmZpbmQoJy5zaG90cy1sZW50YS1wYW5lbF9fY2FyZC15ZWFyJylcbiAgICB0aGlzLmNhcmRib3ggPSB0aGlzLmh0bWwuZmluZCgnLnNob3RzLWxlbnRhLXBhbmVsX19jYXJkJylcbiAgICB0aGlzLmJvZHkgICAgPSB0aGlzLmh0bWwuZmluZCgnLmV4cGxvcmVyLWNhcmRfX2hlYWQtYm9keScpXG4gICAgdGhpcy5sYXN0ICAgID0gdGhpcy5odG1sLmZpbmQoJy5zZWxlY3RvcicpXG5cbiAgICB0aGlzLnBvc3RlciAgPSB0aGlzLmltYWdlLmZpbmQoJ2ltZycpXG5cbiAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMudGFncyAgICAgICAgICA9IG5ldyBUYWdzKClcbiAgICAgICAgdGhpcy5hdXRob3IgICAgICAgID0gbmV3IEF1dGhvcigpXG5cbiAgICAgICAgbGV0IHdhaXRlX2xpa2UgPSBmYWxzZSwgXG4gICAgICAgICAgICB3YWl0ZV9mYXYgID0gZmFsc2VcblxuICAgICAgICB0aGlzLmF1dGhvci5yZW5kZXIoKS5hZGRDbGFzcygnc2VsZWN0b3InKVxuXG4gICAgICAgIHRoaXMuaHRtbC5maW5kKCcuc2hvdHMtbGVudGEtcGFuZWxfX3RhZ3MnKS5hcHBlbmQodGhpcy50YWdzLnJlbmRlcigpKVxuICAgICAgICB0aGlzLmh0bWwuZmluZCgnLnNob3RzLWxlbnRhLXBhbmVsX19hdXRob3InKS5hcHBlbmQodGhpcy5hdXRob3IucmVuZGVyKCkpXG5cbiAgICAgICAgdGhpcy5wb3N0ZXIub25sb2FkID0gKCk9PntcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UuYWRkQ2xhc3MoJ2xvYWRlZCcpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBvc3Rlci5vbmVycm9yID0gKCk9PntcbiAgICAgICAgICAgIHRoaXMucG9zdGVyLnNyYyA9ICcuL2ltZy9pbWdfYnJva2VuLnN2ZydcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmh0bWwucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdG9yJykpLmZvckVhY2goKGJ1dHRvbik9PntcbiAgICAgICAgICAgIGJ1dHRvbi5vbignaG92ZXI6Zm9jdXMgaG92ZXI6aG92ZXIgaG92ZXI6dG91Y2gnLCAoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdCA9IGJ1dHRvblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmh0bWwuZmluZCgnLmFjdGlvbi1saWtlZCcpLm9uKCdob3ZlcjplbnRlcicsICgpPT57XG4gICAgICAgICAgICBpZih3YWl0ZV9saWtlKSByZXR1cm5cblxuICAgICAgICAgICAgd2FpdGVfbGlrZSA9IHRydWVcblxuICAgICAgICAgICAgTGlrZXMudG9nZ2xlKHRoaXMuc2hvdC5pZCwgKHJlYWR5KT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdC5saWtlZCArPSByZWFkeSA/IC0xIDogMVxuXG4gICAgICAgICAgICAgICAgTGFtcGEuTGlzdGVuZXIuc2VuZCgnc2hvdHNfdXBkYXRlJywgey4uLnRoaXMuc2hvdH0pXG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpXG5cbiAgICAgICAgICAgICAgICB3YWl0ZV9saWtlID0gZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5odG1sLmZpbmQoJy5hY3Rpb24tZmF2b3JpdGUnKS5vbignaG92ZXI6ZW50ZXInLCAoKT0+e1xuICAgICAgICAgICAgaWYod2FpdGVfZmF2KSByZXR1cm5cblxuICAgICAgICAgICAgd2FpdGVfZmF2ID0gdHJ1ZVxuXG4gICAgICAgICAgICBGYXZvcml0ZS50b2dnbGUodGhpcy5zaG90LCAocmVhZHkpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5zaG90LnNhdmVkICs9IHJlYWR5ID8gLTEgOiAxXG5cbiAgICAgICAgICAgICAgICBMYW1wYS5MaXN0ZW5lci5zZW5kKCdzaG90c191cGRhdGUnLCB7Li4udGhpcy5zaG90fSlcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKClcblxuICAgICAgICAgICAgICAgIHdhaXRlX2ZhdiA9IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuaHRtbC5maW5kKCcuc2hvdHMtYXV0aG9yJykub24oJ2hvdmVyOmVudGVyJywgKCk9PntcbiAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuYmFjaygpXG5cbiAgICAgICAgICAgIExhbXBhLkFjdGl2aXR5LnB1c2goe1xuICAgICAgICAgICAgICAgIHVybDogJycsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiAnc2hvdHNfY2hhbm5lbCcsXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdTaG90cyAtICcgKyBMYW1wYS5VdGlscy5jYXBpdGFsaXplRmlyc3RMZXR0ZXIodGhpcy5zaG90LmVtYWlsKSxcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5zaG90LmNpZCxcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnNob3QuZW1haWwsXG4gICAgICAgICAgICAgICAgcGFnZTogMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmh0bWwuZmluZCgnLmFjdGlvbi1tb3JlJykub24oJ2hvdmVyOmVudGVyJywgdGhpcy5tZW51LmJpbmQodGhpcykpXG5cbiAgICAgICAgdGhpcy5pbWFnZS5vbignaG92ZXI6ZW50ZXInLCAoKT0+e1xuICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5iYWNrKClcblxuICAgICAgICAgICAgTGFtcGEuQWN0aXZpdHkucHVzaCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnJyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6ICdmdWxsJyxcbiAgICAgICAgICAgICAgICBzb3VyY2U6ICd0bWRiJyxcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5zaG90LmNhcmRfaWQsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiB0aGlzLnNob3QuY2FyZF90eXBlLFxuICAgICAgICAgICAgICAgIGNhcmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuc2hvdC5jYXJkX2lkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLm1lbnUgPSBmdW5jdGlvbigpe1xuICAgICAgICBsZXQgbWVudSAgICAgICA9IFtdXG4gICAgICAgIGxldCBjb250cm9sbGVyID0gTGFtcGEuQ29udHJvbGxlci5lbmFibGVkKCkuY29udHJvbGxlci5saW5rXG4gICAgICAgIGxldCBiYWNrICAgICAgID0gKCk9PntcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuaHRtbC5yZW1vdmVDbGFzcygnaGlkZScpXG5cbiAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdzaG90c19sZW50YScpXG5cbiAgICAgICAgICAgIGNvbnRyb2xsZXIudmlkZW8ucGxheSgpXG5cbiAgICAgICAgICAgIExhbXBhLkJhY2tncm91bmQudGhlbWUoJ2JsYWNrJylcbiAgICAgICAgfVxuXG4gICAgICAgIG1lbnUucHVzaCh7XG4gICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX2J1dHRvbl9yZXBvcnQnKSxcbiAgICAgICAgICAgIG9uU2VsZWN0OiAoKT0+e1xuICAgICAgICAgICAgICAgIE1vZGFscy5zaG90c1JlcG9ydCh0aGlzLnNob3QuaWQsIGJhY2spXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYoTGFtcGEuQWNjb3VudC5QZXJtaXQuYWNjb3VudC5pZCA9PSB0aGlzLnNob3QuY2lkIHx8IExhbXBhLkFjY291bnQuUGVybWl0LmFjY291bnQuaWQgPT0gMSl7XG4gICAgICAgICAgICBtZW51LnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnc2hvdHNfYnV0dG9uX2RlbGV0ZV92aWRlbycpLFxuICAgICAgICAgICAgICAgIG9uU2VsZWN0OiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICBNb2RhbHMuc2hvdHNEZWxldGUodGhpcy5zaG90LmlkLCAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFjaygpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIENyZWF0ZWQucmVtb3ZlKHRoaXMuc2hvdClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnbW9yZScpLFxuICAgICAgICAgICAgc2VwYXJhdG9yOiB0cnVlXG4gICAgICAgIH0pXG5cbiAgICAgICAgbWVudS5wdXNoKHtcbiAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnc2hvdHNfaG93X2NyZWF0ZV92aWRlb190aXRsZScpLFxuICAgICAgICAgICAgc3VidGl0bGU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c19ob3dfY3JlYXRlX3ZpZGVvX3N1YnRpdGxlJyksXG4gICAgICAgICAgICBvblNlbGVjdDogKCk9PntcbiAgICAgICAgICAgICAgICBTbGlkZXMoe1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXM6IFsxLDIsMyw0XS5tYXAoaT0+RGVmaW5lZC5jZG4gKyAncmVjb3JkL3NsaWRlLScgKyBpICsgJy5qcGcnKSxcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uX3RleHQ6ICdzaG90c19idXR0b25fZ29vZCcsXG4gICAgICAgICAgICAgICAgICAgIG9uTG9hZDogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuaHRtbC5hZGRDbGFzcygnaGlkZScpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9uSW5zdGFsbDogYmFjayxcbiAgICAgICAgICAgICAgICAgICAgb25CYWNrOiBiYWNrXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBjb250cm9sbGVyLnZpZGVvLnBhdXNlKClcblxuICAgICAgICBMYW1wYS5TZWxlY3Quc2hvdyh7XG4gICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3RpdGxlX2FjdGlvbicpLFxuICAgICAgICAgICAgaXRlbXM6IG1lbnUsXG4gICAgICAgICAgICBvbkJhY2s6ICgpPT57XG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ3Nob3RzX2xlbnRhJylcblxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIudmlkZW8ucGxheSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmh0bWwuZmluZCgnLmFjdGlvbi1saWtlZCcpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnLCBMaWtlcy5maW5kKHRoaXMuc2hvdC5pZCkpXG4gICAgICAgIHRoaXMuaHRtbC5maW5kKCcuYWN0aW9uLWZhdm9yaXRlJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScsIEZhdm9yaXRlLmZpbmQodGhpcy5zaG90LmlkKSlcblxuICAgICAgICB0aGlzLnRhZ3MudXBkYXRlKHRoaXMuc2hvdClcblxuICAgICAgICBpZih0aGlzLnNob3QudGFncyAmJiB0aGlzLnNob3QudGFncy5sZW5ndGgpe1xuICAgICAgICAgICAgbGV0IGVsZW1fdGFncyA9ICQoJzxkaXY+JyArIHRoaXMuc2hvdC50YWdzLnNsaWNlKDAsMykubWFwKHQ9PicjJyArIExhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c190YWdfJyArIHQuc2x1ZykpLmpvaW4oJyAnKSArJzwvZGl2PicpXG5cbiAgICAgICAgICAgIHRoaXMudGFncy5yZW5kZXIoKS5hcHBlbmQoZWxlbV90YWdzKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVsZW1fbGlrZXMgPSAkKCc8ZGl2Pjxzdmc+PHVzZSB4bGluazpocmVmPVwiI3Nwcml0ZS1sb3ZlXCI+PC91c2U+PC9zdmc+ICcgKyBMYW1wYS5VdGlscy5iaWdOdW1iZXJUb1Nob3J0KHRoaXMuc2hvdC5saWtlZCB8fCAwKSsnPC9kaXY+JylcbiAgICAgICAgbGV0IGVsZW1fc2F2ZWQgPSAkKCc8ZGl2Pjxzdmc+PHVzZSB4bGluazpocmVmPVwiI3Nwcml0ZS1mYXZvcml0ZVwiPjwvdXNlPjwvc3ZnPiAnICsgTGFtcGEuVXRpbHMuYmlnTnVtYmVyVG9TaG9ydCh0aGlzLnNob3Quc2F2ZWQgfHwgMCkrJzwvZGl2PicpXG5cbiAgICAgICAgZWxlbV9saWtlcy50b2dnbGVDbGFzcygnaGlkZScsICh0aGlzLnNob3QubGlrZWQgfHwgMCkgPT0gMClcbiAgICAgICAgZWxlbV9zYXZlZC50b2dnbGVDbGFzcygnaGlkZScsICh0aGlzLnNob3Quc2F2ZWQgfHwgMCkgPT0gMClcblxuICAgICAgICB0aGlzLnRhZ3MucmVuZGVyKCkuYXBwZW5kKGVsZW1fbGlrZXMpXG4gICAgICAgIHRoaXMudGFncy5yZW5kZXIoKS5hcHBlbmQoZWxlbV9zYXZlZClcblxuICAgICAgICBpZihMYW1wYS5BY2NvdW50LlBlcm1pdC5hY2NvdW50LmlkID09IDEpIHRoaXMucmVjb3JkZXIudGV4dCh0aGlzLnNob3QucmVjb3JkZXIgfHwgJycpLnRvZ2dsZUNsYXNzKCdoaWRlJywgIXRoaXMuc2hvdC5yZWNvcmRlcilcbiAgICB9XG5cbiAgICB0aGlzLmNoYW5nZSA9IGZ1bmN0aW9uKHNob3Qpe1xuICAgICAgICB0aGlzLnNob3QgPSBzaG90XG4gICAgICAgIFxuICAgICAgICB0aGlzLmF1dGhvci51cGRhdGUoc2hvdClcblxuICAgICAgICB0aGlzLm5ldHdvcmsuY2xlYXIoKVxuXG4gICAgICAgIHRoaXMubG9hZCgpXG5cbiAgICAgICAgdGhpcy51cGRhdGUoKVxuICAgIH1cblxuICAgIHRoaXMubG9hZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuaW1hZ2UucmVtb3ZlQ2xhc3MoJ2xvYWRlZCcpXG4gICAgICAgIHRoaXMuY2FyZGJveC5hZGRDbGFzcygnbG9hZGluZycpXG5cbiAgICAgICAgaWYodGhpcy5jYWNoZVsgdGhpcy5zaG90LmlkIF0pIHJldHVybiB0aGlzLmxvYWREb25lKHRoaXMuY2FjaGVbIHRoaXMuc2hvdC5pZCBdKVxuXG4gICAgICAgIGxldCB1cmwgPSBMYW1wYS5UTURCLmFwaSh0aGlzLnNob3QuY2FyZF90eXBlICsgJy8nICsgdGhpcy5zaG90LmNhcmRfaWQgKyAnP2FwaV9rZXk9JyArIExhbXBhLlRNREIua2V5KCkgKyAnJmxhbmd1YWdlPScgKyBMYW1wYS5TdG9yYWdlLmZpZWxkKCd0bWRiX2xhbmcnKSlcblxuICAgICAgICB0aGlzLm5ldHdvcmsuc2lsZW50KHVybCwgdGhpcy5sb2FkRG9uZS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIHRoaXMubG9hZERvbmUgPSBmdW5jdGlvbihjYXJkKXtcbiAgICAgICAgdGhpcy5zaG90LmNhcmRfdGl0bGUgID0gY2FyZC50aXRsZSB8fCBjYXJkLm5hbWUgfHwgY2FyZC5vcmlnaW5hbF90aXRsZSB8fCBjYXJkLm9yaWdpbmFsX25hbWVcbiAgICAgICAgdGhpcy5zaG90LmNhcmRfcG9zdGVyID0gY2FyZC5wb3N0ZXJfcGF0aCB8fCBjYXJkLmJhY2tkcm9wX3BhdGhcbiAgICAgICAgdGhpcy5zaG90LmNhcmRfeWVhciAgID0gKGNhcmQucmVsZWFzZV9kYXRlIHx8IGNhcmQuZmlyc3RfYWlyX2RhdGUgfHwgJy0tLS0nKS5zbGljZSgwLDQpXG5cbiAgICAgICAgdGhpcy50aXRsZS50ZXh0KHRoaXMuc2hvdC5jYXJkX3RpdGxlKVxuICAgICAgICB0aGlzLnllYXIudGV4dCh0aGlzLnNob3QuY2FyZF95ZWFyKVxuXG4gICAgICAgIHRoaXMucG9zdGVyLnNyYyA9IExhbXBhLlRNREIuaW1hZ2UoJ3QvcC93MzAwLycgKyB0aGlzLnNob3QuY2FyZF9wb3N0ZXIpXG5cbiAgICAgICAgdGhpcy5jYXJkYm94LnJlbW92ZUNsYXNzKCdsb2FkaW5nJylcblxuICAgICAgICB0aGlzLmNhY2hlWyB0aGlzLnNob3QuaWQgXSA9IGNhcmRcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmh0bWxcbiAgICB9XG5cbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zaG93X3RpbWVvdXQpXG5cbiAgICAgICAgdGhpcy5odG1sLnJlbW92ZSgpXG5cbiAgICAgICAgdGhpcy5jYWNoZSA9IHt9XG5cbiAgICAgICAgdGhpcy5uZXR3b3JrLmNsZWFyKClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhbmVsIiwiaW1wb3J0IFZpZGVvIGZyb20gJy4vdmlkZW8uanMnXG5pbXBvcnQgUGFuZWwgZnJvbSAnLi9wYW5lbC5qcydcbmltcG9ydCBNZXRyaWMgZnJvbSAnLi4vdXRpbHMvbWV0cmljLmpzJ1xuXG5mdW5jdGlvbiBMZW50YShmaXJzdCwgcGxheWxpc3Qpe1xuICAgIHRoaXMuaHRtbCA9IExhbXBhLlRlbXBsYXRlLmpzKCdzaG90c19sZW50YScpXG5cbiAgICB0aGlzLmN1cnJlbnQgID0gZmlyc3RcbiAgICB0aGlzLnBsYXlsaXN0ID0gcGxheWxpc3QgfHwgW11cbiAgICB0aGlzLnBvc2l0aW9uID0gcGxheWxpc3QuaW5kZXhPZihwbGF5bGlzdC5maW5kKGk9PmkuaWQgPT0gZmlyc3QuaWQpKVxuICAgIHRoaXMucGFnZSAgICAgPSAxXG4gICAgXG4gICAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMudmlkZW8gPSBuZXcgVmlkZW8odGhpcy5jdXJyZW50KVxuICAgICAgICB0aGlzLnBhbmVsID0gbmV3IFBhbmVsKHRoaXMuY3VycmVudClcblxuICAgICAgICB0aGlzLnZpZGVvLmNyZWF0ZSgpXG4gICAgICAgIHRoaXMucGFuZWwuY3JlYXRlKClcblxuICAgICAgICBpZihMYW1wYS5QbGF0Zm9ybS5tb3VzZSgpIHx8IExhbXBhLlV0aWxzLmlzVG91Y2hEZXZpY2UoKSl7XG4gICAgICAgICAgICBsZXQgaGVhZCA9IExhbXBhLlRlbXBsYXRlLmpzKCdoZWFkX2JhY2t3YXJkJywge3RpdGxlOiAnJ30pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGhlYWQuZmluZCgnLmhlYWQtYmFja3dhcmRfX2J1dHRvbicpLm9uKCdjbGljaycsIExhbXBhLkNvbnRyb2xsZXIuYmFjay5iaW5kKExhbXBhLkNvbnRyb2xsZXIpKVxuXG4gICAgICAgICAgICB0aGlzLmh0bWwuYXBwZW5kKGhlYWQpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmh0bWwuZmluZCgnLnNob3RzLWxlbnRhX192aWRlbycpLmFwcGVuZCh0aGlzLnZpZGVvLnJlbmRlcigpKVxuICAgICAgICB0aGlzLmh0bWwuZmluZCgnLnNob3RzLWxlbnRhX19wYW5lbCcpLmFwcGVuZCh0aGlzLnBhbmVsLnJlbmRlcigpKVxuXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnYW1iaWVuY2UtLWVuYWJsZScpLmFwcGVuZCh0aGlzLmh0bWwpXG5cbiAgICAgICAgdGhpcy52aWRlby5jaGFuZ2UodGhpcy5jdXJyZW50LCAnbmV4dCcpXG4gICAgICAgIHRoaXMucGFuZWwuY2hhbmdlKHRoaXMuY3VycmVudCwgJ25leHQnKVxuXG4gICAgICAgIHRoaXMuY29udHJvbGxlcigpXG4gICAgICAgIHRoaXMuc2Nyb2xsKClcblxuICAgICAgICB0aGlzLmh0bWwub24oJ21vdXNlbW92ZScsIHRoaXMuZm9jdXMuYmluZCh0aGlzKSlcblxuICAgICAgICBMYW1wYS5CYWNrZ3JvdW5kLnRoZW1lKCdibGFjaycpXG5cbiAgICAgICAgTWV0cmljLmNvdW50ZXIoJ3Nob3RzX2xlbnRhX2xhdW5jaCcpXG4gICAgfVxuXG4gICAgdGhpcy5zY3JvbGwgPSBmdW5jdGlvbigpe1xuICAgICAgICBsZXQgX3NlbGYgPSB0aGlzXG5cbiAgICAgICAgaWYoTGFtcGEuVXRpbHMuaXNUb3VjaERldmljZSgpKXtcbiAgICAgICAgICAgIGxldCBzdGFydF9wb3NpdGlvbiA9IDBcbiAgICAgICAgICAgIGxldCBtb3ZlX3Bvc2l0aW9uICA9IDBcbiAgICAgICAgICAgIGxldCBlbmRfcG9zaXRpb24gICA9IDBcbiAgICAgICAgICAgIGxldCB0aW1lX3Njcm9sbCAgICA9IDBcbiAgICAgICAgICAgIGxldCBlbGVtbW92ZSAgICAgICA9IHRoaXMuaHRtbC5maW5kKCcuc2hvdHMtbGVudGEtdmlkZW9fX3ZpZGVvLWVsZW1lbnQnKVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBtb3Zlc3RhcnQoZSl7XG4gICAgICAgICAgICAgICAgc3RhcnRfcG9zaXRpb24gPSBlLmNsaWVudFlcbiAgICAgICAgICAgICAgICBlbmRfcG9zaXRpb24gICA9IHN0YXJ0X3Bvc2l0aW9uXG4gICAgICAgICAgICAgICAgbW92ZV9wb3NpdGlvbiAgPSBzdGFydF9wb3NpdGlvblxuICAgICAgICAgICAgICAgIHRpbWVfc2Nyb2xsICAgID0gRGF0ZS5ub3coKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBtb3ZlKGUpe1xuICAgICAgICAgICAgICAgIG1vdmVfcG9zaXRpb24gPSBlLmNsaWVudFlcbiAgICAgICAgICAgICAgICBlbmRfcG9zaXRpb24gID0gZS5jbGllbnRZXG5cbiAgICAgICAgICAgICAgICBsZXQgZGVsdGEgPSBtb3ZlX3Bvc2l0aW9uIC0gc3RhcnRfcG9zaXRpb25cblxuICAgICAgICAgICAgICAgIGVsZW1tb3ZlLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKCcgKyBkZWx0YSArICdweCknXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG1vdmVlbmQoZSl7XG4gICAgICAgICAgICAgICAgZWxlbW1vdmUuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoMHB4KSdcblxuICAgICAgICAgICAgICAgIGxldCB0aHJlc2hvbGQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyLjVcblxuICAgICAgICAgICAgICAgIGxldCBjc3JvbGxfc3BlZWQgPSBEYXRlLm5vdygpIC0gdGltZV9zY3JvbGxcblxuICAgICAgICAgICAgICAgIGlmKGNzcm9sbF9zcGVlZCA8IDIwMCl7XG4gICAgICAgICAgICAgICAgICAgIHRocmVzaG9sZCA9IHRocmVzaG9sZCAvIDZcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihzdGFydF9wb3NpdGlvbiAtIGVuZF9wb3NpdGlvbiA+IHRocmVzaG9sZCl7XG4gICAgICAgICAgICAgICAgICAgIF9zZWxmLm1vdmUoJ25leHQnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGVuZF9wb3NpdGlvbiAtIHN0YXJ0X3Bvc2l0aW9uID4gdGhyZXNob2xkKXtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYubW92ZSgncHJldicpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZW5kX3Bvc2l0aW9uICAgPSAwXG4gICAgICAgICAgICAgICAgc3RhcnRfcG9zaXRpb24gPSAwXG4gICAgICAgICAgICAgICAgbW92ZV9wb3NpdGlvbiAgPSAwXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaHRtbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywoZSk9PntcbiAgICAgICAgICAgICAgICBtb3Zlc3RhcnQoZS50b3VjaGVzWzBdIHx8IGUuY2hhbmdlZFRvdWNoZXNbMF0pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLmh0bWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywoZSk9PntcbiAgICAgICAgICAgICAgICBtb3ZlKGUudG91Y2hlc1swXSB8fCBlLmNoYW5nZWRUb3VjaGVzWzBdKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5odG1sLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgbW92ZWVuZClcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgbGV0IHRpbWUgID0gMFxuXG4gICAgICAgICAgICBmdW5jdGlvbiB3aGVlbChlKXtcbiAgICAgICAgICAgICAgICBpZihEYXRlLm5vdygpIC0gdGltZSA+IDUwMCl7XG4gICAgICAgICAgICAgICAgICAgIHRpbWUgPSBEYXRlLm5vdygpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZS53aGVlbERlbHRhIC8gMTIwID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGYubW92ZSgncHJldicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmLm1vdmUoJ25leHQnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyDQntCx0YDQsNCx0LDRgtGL0LLQsNC10Lwg0YHQutGA0L7Qu9C7INC60L7Qu9C10YHQvtC8INC80YvRiNC4XG4gICAgICAgICAgICB0aGlzLmh0bWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIHdoZWVsKVxuICAgICAgICAgICAgdGhpcy5odG1sLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgd2hlZWwpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmZvY3VzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoTGFtcGEuVXRpbHMuaXNUb3VjaERldmljZSgpKSByZXR1cm5cblxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5mb2N1c190aW1lb3V0KVxuXG4gICAgICAgIHRoaXMuaHRtbC50b2dnbGVDbGFzcygnc2hvdHMtbGVudGEtLWhpZGUtcGFuZWwnLCBmYWxzZSlcblxuICAgICAgICB0aGlzLmZvY3VzX3RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICBpZihMYW1wYS5Db250cm9sbGVyLmVuYWJsZWQoKS5uYW1lICE9PSAnc2hvdHNfbGVudGEnKSByZXR1cm5cblxuICAgICAgICAgICAgdGhpcy5odG1sLnRvZ2dsZUNsYXNzKCdzaG90cy1sZW50YS0taGlkZS1wYW5lbCcsIHRydWUpXG5cbiAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuYWRkKCdzaG90c19sZW50YV9pZGxlJyx7XG4gICAgICAgICAgICAgICAgbGluazogdGhpcy52aWRlbyxcbiAgICAgICAgICAgICAgICB0b2dnbGU6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY2xlYXIoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbGVmdDogdGhpcy5jb250cm9sbGVyLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMuY29udHJvbGxlci5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgIHVwOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmUoJ3ByZXYnKVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZG93bjogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlKCduZXh0JylcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVudGVyOiB0aGlzLmNvbnRyb2xsZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICBiYWNrOiB0aGlzLmNvbnRyb2xsZXIuYmluZCh0aGlzKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ3Nob3RzX2xlbnRhX2lkbGUnKVxuICAgICAgICB9LDcwMDApXG4gICAgfVxuXG4gICAgdGhpcy5jb250cm9sbGVyID0gZnVuY3Rpb24oKXtcbiAgICAgICAgTGFtcGEuQ29udHJvbGxlci5hZGQoJ3Nob3RzX2xlbnRhJyx7XG4gICAgICAgICAgICBsaW5rOiB0aGlzLFxuICAgICAgICAgICAgdG9nZ2xlOiAoKT0+e1xuICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIuY2xlYXIoKVxuXG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jb2xsZWN0aW9uU2V0KHRoaXMuaHRtbClcbiAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLmNvbGxlY3Rpb25Gb2N1cyh0aGlzLnBhbmVsLmJvZHksIHRoaXMuaHRtbClcblxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZnQ6ICgpPT57XG4gICAgICAgICAgICAgICAgaWYoTmF2aWdhdG9yLmNhbm1vdmUoJ2xlZnQnKSkgTmF2aWdhdG9yLm1vdmUoJ2xlZnQnKVxuXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmlnaHQ6ICgpPT57XG4gICAgICAgICAgICAgICAgaWYoTmF2aWdhdG9yLmNhbm1vdmUoJ3JpZ2h0JykpIE5hdmlnYXRvci5tb3ZlKCdyaWdodCcpXG5cbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cDogKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmUoJ3ByZXYnKVxuXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG93bjogKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmUoJ25leHQnKVxuXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFjazogdGhpcy5iYWNrLmJpbmQodGhpcylcbiAgICAgICAgfSlcblxuICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnc2hvdHNfbGVudGEnKVxuICAgIH1cblxuICAgIHRoaXMubW92ZSA9IGZ1bmN0aW9uKGRpcmVjdGlvbil7XG4gICAgICAgIGxldCBzdGFydF9wb3NpdGlvbiA9IHRoaXMucG9zaXRpb25cblxuICAgICAgICBpZihkaXJlY3Rpb24gPT0gJ25leHQnKXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24rK1xuXG4gICAgICAgICAgICBpZih0aGlzLnBvc2l0aW9uID49IHRoaXMucGxheWxpc3QubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wbGF5bGlzdC5sZW5ndGggLSAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihkaXJlY3Rpb24gPT0gJ3ByZXYnKXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24tLVxuXG4gICAgICAgICAgICBpZih0aGlzLnBvc2l0aW9uIDwgMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHN0YXJ0X3Bvc2l0aW9uICE9PSB0aGlzLnBvc2l0aW9uKXtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMucGxheWxpc3RbdGhpcy5wb3NpdGlvbl1cblxuICAgICAgICAgICAgdGhpcy52aWRlby5jaGFuZ2UodGhpcy5jdXJyZW50LCBkaXJlY3Rpb24pXG4gICAgICAgICAgICB0aGlzLnBhbmVsLmNoYW5nZSh0aGlzLmN1cnJlbnQsIGRpcmVjdGlvbilcblxuICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci50b2dnbGUoJ3Nob3RzX2xlbnRhJylcblxuICAgICAgICAgICAgTWV0cmljLmNvdW50ZXIoJ3Nob3RzX2xlbnRhX25leHQnKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5wb3NpdGlvbiA+PSB0aGlzLnBsYXlsaXN0Lmxlbmd0aCAtIDMpe1xuICAgICAgICAgICAgdGhpcy5uZXh0UGFydCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm5leHRQYXJ0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYodGhpcy5vbk5leHQpe1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nX3BhcnQgPSB0cnVlXG5cbiAgICAgICAgICAgIHRoaXMucGFnZSsrXG5cbiAgICAgICAgICAgIHRoaXMub25OZXh0KHRoaXMucGFnZSwgKHJlc3VsdHMpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nX3BhcnQgPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0cyAmJiByZXN1bHRzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMuZm9yRWFjaChpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5wbGF5bGlzdC5maW5kKHA9PnAuaWQgPT0gaS5pZCkpIHRoaXMucGxheWxpc3QucHVzaChpKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmJhY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmRlc3Ryb3koKVxuXG4gICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdjb250ZW50JylcbiAgICB9XG5cbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5mb2N1c190aW1lb3V0KVxuXG4gICAgICAgIHRoaXMudmlkZW8uZGVzdHJveSgpXG4gICAgICAgIHRoaXMucGFuZWwuZGVzdHJveSgpXG5cbiAgICAgICAgdGhpcy5odG1sLnJlbW92ZSgpXG5cbiAgICAgICAgTGFtcGEuQmFja2dyb3VuZC50aGVtZSgncmVzZXQnKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGVudGEiLCJpbXBvcnQgVGFncyBmcm9tICcuL3RhZ3MuanMnXG5pbXBvcnQgTGVudGEgZnJvbSAnLi4vbGVudGEvbGVudGEuanMnXG5pbXBvcnQgSGFuZGxlciBmcm9tICcuLi91dGlscy9oYW5kbGVyLmpzJ1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3V0aWxzL3V0aWxzLmpzJ1xuXG5mdW5jdGlvbiBTaG90KGl0ZW1fZGF0YSwgcGFyYW1zID0ge30pe1xuICAgIGxldCBjbG9uZSA9IExhbXBhLkFycmF5cy5jbG9uZShpdGVtX2RhdGEpXG5cbiAgICBpdGVtX2RhdGEuY2FyZCA9IHtcbiAgICAgICAgaWQ6IGl0ZW1fZGF0YS5jYXJkX2lkLFxuICAgICAgICB0eXBlOiBpdGVtX2RhdGEuY2FyZF90eXBlLFxuICAgICAgICB0aXRsZTogaXRlbV9kYXRhLmNhcmRfdGl0bGUsXG4gICAgICAgIHJlbGVhc2VfZGF0ZTogaXRlbV9kYXRhLmNhcmRfeWVhcixcbiAgICAgICAgcG9zdGVyX3BhdGg6IGl0ZW1fZGF0YS5jYXJkX3Bvc3RlclxuICAgIH1cblxuICAgIGl0ZW1fZGF0YS5pbWcgPSBpdGVtX2RhdGEuc2NyZWVuXG5cbiAgICBsZXQgaXRlbSAgPSBMYW1wYS5NYWtlci5tYWtlKCdFcGlzb2RlJywgaXRlbV9kYXRhLCAobW9kdWxlKT0+bW9kdWxlLm9ubHkoJ0NhcmQnLCAnQ2FsbGJhY2snKSlcblxuICAgIGl0ZW0udXNlKHtcbiAgICAgICAgb25DcmVhdGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB0aGlzLmh0bWwuZmluZCgnLmZ1bGwtZXBpc29kZV9fbmFtZScpLnJlbW92ZSgpXG4gICAgICAgICAgICB0aGlzLmh0bWwuZmluZCgnLmZ1bGwtZXBpc29kZV9fbnVtJykucmVtb3ZlKClcblxuICAgICAgICAgICAgaWYocGFyYW1zLndpdGhvdXRfY2FyZCkgdGhpcy5odG1sLmZpbmQoJy5jYXJkLWVwaXNvZGVfX2Zvb3RlcicpLmFkZENsYXNzKCdoaWRlJylcblxuICAgICAgICAgICAgbGV0IHRhZ3MgPSBuZXcgVGFncyh0aGlzLmRhdGEpXG4gICAgICAgICAgICAgICAgdGFncy5jcmVhdGUoKVxuXG4gICAgICAgICAgICB0aGlzLmh0bWwuZmluZCgnLmZ1bGwtZXBpc29kZV9fZGF0ZScpLmVtcHR5KCkuYXBwZW5kKHRhZ3MucmVuZGVyKCkpXG5cbiAgICAgICAgICAgIHRoaXMuaHRtbC5hZGRDbGFzcygnZnVsbC1lcGlzb2RlLS1zaG90JylcblxuICAgICAgICAgICAgdGhpcy5saWtlZCA9ICQoYFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmdWxsLWVwaXNvZGVfX2xpa2VkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmc+PHVzZSB4bGluazpocmVmPVwiI3Nwcml0ZS1sb3ZlXCI+PC91c2U+PC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7TGFtcGEuVXRpbHMuYmlnTnVtYmVyVG9TaG9ydCh0aGlzLmRhdGEubGlrZWQpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGApXG5cbiAgICAgICAgICAgIHRoaXMuaHRtbC5maW5kKCcuZnVsbC1lcGlzb2RlX19kYXRlJykuYXBwZW5kKHRoaXMubGlrZWQpXG5cbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gTGFtcGEuVGVtcGxhdGUuZWxlbSgnZGl2Jywge2NsYXNzOiAnc2hvdHMtc3RhdHVzIGhpZGUnfSlcblxuICAgICAgICAgICAgdGhpcy5odG1sLmZpbmQoJy5jYXJkX19sZWZ0JykuYXBwZW5kKHRoaXMuc3RhdHVzKVxuXG4gICAgICAgICAgICB0aGlzLmh0bWwuZmluZCgnLmZ1bGwtZXBpc29kZScpLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwiZnVsbC1lcGlzb2RlX19zaG90LWljb25cIj48c3ZnPjx1c2UgeGxpbms6aHJlZj1cIiNzcHJpdGUtc2hvdHNcIj48L3VzZT48L3N2Zz48L2Rpdj4nKSlcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0dXNIYW5kbGVyID0gKGUpPT57XG4gICAgICAgICAgICAgICAgaWYoZS5pZCAhPT0gdGhpcy5kYXRhLmlkKSByZXR1cm5cblxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzLnRvZ2dsZUNsYXNzKCdoaWRlJywgZS5zdGF0dXMgPT0gJ3JlYWR5JylcblxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzLnRvZ2dsZUNsYXNzKCdzaG90cy1zdGF0dXMtLWVycm9yJywgZS5zdGF0dXMgPT0gJ2Vycm9yJylcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cy50b2dnbGVDbGFzcygnc2hvdHMtc3RhdHVzLS1wcm9jZXNzaW5nJywgZS5zdGF0dXMgPT0gJ3Byb2Nlc3NpbmcnIHx8IGUuc3RhdHVzID09ICdjb252ZXJ0aW5nJylcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cy50b2dnbGVDbGFzcygnc2hvdHMtc3RhdHVzLS1yZWFkeScsIGUuc3RhdHVzID09ICdyZWFkeScpXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMudG9nZ2xlQ2xhc3MoJ3Nob3RzLXN0YXR1cy0tZGVsZXRlZCcsIGUuc3RhdHVzID09ICdkZWxldGVkJylcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cy50b2dnbGVDbGFzcygnc2hvdHMtc3RhdHVzLS1ibG9ja2VkJywgZS5zdGF0dXMgPT0gJ2Jsb2NrZWQnKVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMudGV4dChcbiAgICAgICAgICAgICAgICAgICAgZS5zdGF0dXMgPT0gJ2Vycm9yJyA/IExhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c19zdGF0dXNfZXJyb3InKSA6XG4gICAgICAgICAgICAgICAgICAgIGUuc3RhdHVzID09ICdwcm9jZXNzaW5nJyB8fCBlLnN0YXR1cyA9PSAnY29udmVydGluZycgPyBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnc2hvdHNfc3RhdHVzX3Byb2Nlc3NpbmcnKSA6XG4gICAgICAgICAgICAgICAgICAgIGUuc3RhdHVzID09ICdibG9ja2VkJyA/IExhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c19zdGF0dXNfYmxvY2tlZCcpIDpcbiAgICAgICAgICAgICAgICAgICAgZS5zdGF0dXMgPT0gJ2RlbGV0ZWQnID8gTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX3N0YXR1c19kZWxldGVkJykgOlxuICAgICAgICAgICAgICAgICAgICBlLnN0YXR1cyA9PSAncmVhZHknID8gTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX3N0YXR1c19yZWFkeScpIDogJydcbiAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgICBVdGlscy52aWRlb1JlcGxhY2VTdGF0dXMoZSwgdGhpcy5kYXRhKVxuICAgICAgICAgICAgICAgIFV0aWxzLnZpZGVvUmVwbGFjZVN0YXR1cyhlLCBjbG9uZSlcblxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5pbWcgPSBlLnNjcmVlblxuXG4gICAgICAgICAgICAgICAgaWYoZS5zY3JlZW4pIHRoaXMuZW1pdCgndmlzaWJsZScpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlRGF0YUhhbmRsZXIgPSAoZSk9PntcbiAgICAgICAgICAgICAgICBpZihlLmlkICE9PSB0aGlzLmRhdGEuaWQpIHJldHVyblxuXG4gICAgICAgICAgICAgICAgdGhpcy5saWtlZC5maW5kKCdzcGFuJykudGV4dChMYW1wYS5VdGlscy5iaWdOdW1iZXJUb1Nob3J0KGUubGlrZWQgfHwgdGhpcy5kYXRhLmxpa2VkKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTGFtcGEuTGlzdGVuZXIuZm9sbG93KCdzaG90c19zdGF0dXMnLCB0aGlzLnVwZGF0ZVN0YXR1c0hhbmRsZXIpXG4gICAgICAgICAgICBMYW1wYS5MaXN0ZW5lci5mb2xsb3coJ3Nob3RzX3VwZGF0ZScsIHRoaXMudXBkYXRlRGF0YUhhbmRsZXIpXG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdHVzSGFuZGxlcih0aGlzLmRhdGEpXG5cbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5zdGF0dXMgPT0gJ3Byb2Nlc3NpbmcnICYmIExhbXBhLkFjY291bnQuUGVybWl0LmFjY291bnQuaWQgPT0gdGhpcy5kYXRhLmNpZCkgSGFuZGxlci5hZGQoY2xvbmUpXG4gICAgICAgIH0sXG4gICAgICAgIG9ubHlFbnRlcjogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGxldCBsZW50YSA9IG5ldyBMZW50YShjbG9uZSwgcGFyYW1zLnBsYXlsaXN0IHx8IFt0aGlzLmRhdGFdKVxuXG4gICAgICAgICAgICBsZW50YS5vbk5leHQgPSBwYXJhbXMub25OZXh0XG5cbiAgICAgICAgICAgIGxlbnRhLnN0YXJ0KClcbiAgICAgICAgfSxcbiAgICAgICAgb25seUZvY3VzOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgTGFtcGEuQmFja2dyb3VuZC5jaGFuZ2UodGhpcy5kYXRhLmltZyB8fCAnJylcbiAgICAgICAgfSxcbiAgICAgICAgb25SZW1vdmU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBMYW1wYS5MaXN0ZW5lci5yZW1vdmUoJ3Nob3RzX3N0YXR1cycsIHRoaXMudXBkYXRlU3RhdHVzSGFuZGxlcilcbiAgICAgICAgICAgIExhbXBhLkxpc3RlbmVyLnJlbW92ZSgnc2hvdHNfdXBkYXRlJywgdGhpcy51cGRhdGVEYXRhSGFuZGxlcilcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gaXRlbVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaG90IiwiaW1wb3J0IEFwaSBmcm9tICcuLi91dGlscy9hcGkuanMnXG5pbXBvcnQgU2hvdCBmcm9tICcuL3Nob3QuanMnXG5cbmZ1bmN0aW9uIGNvbXBvbmVudChvYmplY3Qpe1xuICAgIExhbXBhLlV0aWxzLmV4dGVuZFBhcmFtcyhvYmplY3QsIHtcbiAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAgIGNvbHM6IDRcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBsZXQgY29tcCAgICAgPSBMYW1wYS5NYWtlci5tYWtlKCdDYXRlZ29yeScsIG9iamVjdCwgKG1vZHVsZSk9Pm1vZHVsZS50b2dnbGUoTGFtcGEuTWFrZXIubW9kdWxlKCdDYXRlZ29yeScpLk1BU0suYmFzZSwgJ1BhZ2luYXRpb24nKSlcbiAgICBsZXQgcGxheWxpc3QgPSBbXVxuXG4gICAgY29tcC51c2Uoe1xuICAgICAgICBvbkNyZWF0ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIEFwaS5zaG90c0xpc3Qob2JqZWN0LnVybCwgb2JqZWN0LnBhZ2UsIChyZXN1bHQpPT57XG4gICAgICAgICAgICAgICAgcGxheWxpc3QgPSBMYW1wYS5BcnJheXMuY2xvbmUocmVzdWx0LnJlc3VsdHMpXG5cbiAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkKHJlc3VsdClcbiAgICAgICAgICAgIH0sIHRoaXMuZW1wdHkuYmluZCh0aGlzKSlcbiAgICAgICAgfSxcbiAgICAgICAgb25OZXh0OiBmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgICAgICAgQXBpLnNob3RzTGlzdChvYmplY3QudXJsLCBvYmplY3QucGFnZSwgKHJlc3VsdCk9PntcbiAgICAgICAgICAgICAgICBwbGF5bGlzdCA9IHBsYXlsaXN0LmNvbmNhdChyZXN1bHQucmVzdWx0cylcblxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KVxuICAgICAgICAgICAgfSwgcmVqZWN0LmJpbmQodGhpcykpXG4gICAgICAgIH0sXG4gICAgICAgIG9ubHlDcmVhdGVBbmRBcHBlbmQ6IGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gbmV3IFNob3QoZWxlbWVudCwge1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2luc3RhbmNlJywgaXRlbSwgZWxlbWVudClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpdGVtLmNyZWF0ZSgpXG5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2FwcGVuZCcsIGl0ZW0sIGVsZW1lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaChlKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1dhcm5pbmcnLCAnb25DcmVhdGVBbmRBcHBlbmQgZXJyb3I6JywgZS5tZXNzYWdlLCBlLnN0YWNrKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBwbGF5bGlzdCA9IG51bGxcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gY29tcFxufVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQiLCJpbXBvcnQgQXBpIGZyb20gJy4uL3V0aWxzL2FwaS5qcydcbmltcG9ydCBTaG90IGZyb20gJy4vc2hvdC5qcydcbmltcG9ydCBTbGlkZXMgZnJvbSAnLi9zbGlkZXMuanMnXG5pbXBvcnQgRGVmaW5lZCBmcm9tICcuLi9kZWZpbmVkLmpzJ1xuXG5mdW5jdGlvbiBjb21wb25lbnQob2JqZWN0KXtcbiAgICBMYW1wYS5VdGlscy5leHRlbmRQYXJhbXMob2JqZWN0LCB7XG4gICAgICAgIGl0ZW1zOiB7XG4gICAgICAgICAgICBjb2xzOiBMYW1wYS5TdG9yYWdlLmZpZWxkKCdpbnRlcmZhY2Vfc2l6ZScpID09ICdiaWdnZXInID8gNDogM1xuICAgICAgICB9LFxuICAgICAgICBlbXB0eToge1xuICAgICAgICAgICAgZGVzY3I6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c19jYXJkX2VtcHR5X2Rlc2NyJyksXG4gICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX2hvd19jcmVhdGVfdmlkZW9fdGl0bGUnKSxcbiAgICAgICAgICAgICAgICAgICAgb25FbnRlcjogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIFNsaWRlcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzOiBbMSwyLDMsNF0ubWFwKGk9PkRlZmluZWQuY2RuICsgJ3JlY29yZC9zbGlkZS0nICsgaSArICcuanBnJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uX3RleHQ6ICdzaG90c19idXR0b25fZ29vZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Mb2FkOiAoKT0+e30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25JbnN0YWxsOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJhY2s6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdjb250ZW50JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGxldCBjb21wICAgICA9IExhbXBhLk1ha2VyLm1ha2UoJ0NhdGVnb3J5Jywgb2JqZWN0LCAobW9kdWxlKT0+bW9kdWxlLnRvZ2dsZShMYW1wYS5NYWtlci5tb2R1bGUoJ0NhdGVnb3J5JykuTUFTSy5iYXNlLCAnUGFnaW5hdGlvbicsICdFeHBsb3JlcicpKVxuICAgIGxldCBwbGF5bGlzdCA9IFtdXG5cbiAgICBjb21wLnVzZSh7XG4gICAgICAgIG9uQ3JlYXRlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgQXBpLnNob3RzQ2FyZChvYmplY3QuY2FyZCwgb2JqZWN0LnBhZ2UsIChyZXN1bHQpPT57XG4gICAgICAgICAgICAgICAgcGxheWxpc3QgPSBMYW1wYS5BcnJheXMuY2xvbmUocmVzdWx0LnJlc3VsdHMpXG5cbiAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkKHJlc3VsdClcbiAgICAgICAgICAgIH0sIHRoaXMuZW1wdHkuYmluZCh0aGlzKSlcbiAgICAgICAgfSxcbiAgICAgICAgb25OZXh0OiBmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgICAgICAgQXBpLnNob3RzQ2FyZChvYmplY3QuY2FyZCwgb2JqZWN0LnBhZ2UsIChyZXN1bHQpPT57XG4gICAgICAgICAgICAgICAgcGxheWxpc3QgPSBwbGF5bGlzdC5jb25jYXQocmVzdWx0LnJlc3VsdHMpXG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdClcbiAgICAgICAgICAgIH0sIHJlamVjdC5iaW5kKHRoaXMpKVxuICAgICAgICB9LFxuICAgICAgICBvbmx5Q3JlYXRlQW5kQXBwZW5kOiBmdW5jdGlvbihlbGVtZW50KXtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IG5ldyBTaG90KGVsZW1lbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3QsXG4gICAgICAgICAgICAgICAgICAgIHdpdGhvdXRfY2FyZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2luc3RhbmNlJywgaXRlbSwgZWxlbWVudClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpdGVtLmNyZWF0ZSgpXG5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2FwcGVuZCcsIGl0ZW0sIGVsZW1lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaChlKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1dhcm5pbmcnLCAnb25DcmVhdGVBbmRBcHBlbmQgZXJyb3I6JywgZS5tZXNzYWdlLCBlLnN0YWNrKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBwbGF5bGlzdCA9IG51bGxcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gY29tcFxufVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQiLCJpbXBvcnQgQXBpIGZyb20gJy4uL3V0aWxzL2FwaS5qcydcbmltcG9ydCBTaG90IGZyb20gJy4vc2hvdC5qcydcblxuZnVuY3Rpb24gY29tcG9uZW50KG9iamVjdCl7XG4gICAgTGFtcGEuVXRpbHMuZXh0ZW5kUGFyYW1zKG9iamVjdCwge1xuICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgY29sczogNFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGxldCBjb21wICAgICA9IExhbXBhLk1ha2VyLm1ha2UoJ0NhdGVnb3J5Jywgb2JqZWN0LCAobW9kdWxlKT0+bW9kdWxlLnRvZ2dsZShMYW1wYS5NYWtlci5tb2R1bGUoJ0NhdGVnb3J5JykuTUFTSy5iYXNlLCAnUGFnaW5hdGlvbicpKVxuICAgIGxldCBwbGF5bGlzdCA9IFtdXG5cbiAgICBjb21wLnVzZSh7XG4gICAgICAgIG9uQ3JlYXRlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgQXBpLnNob3RzQ2hhbm5lbChvYmplY3QuaWQsIG9iamVjdC5wYWdlLCAocmVzdWx0KT0+e1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0ID0gTGFtcGEuQXJyYXlzLmNsb25lKHJlc3VsdC5yZXN1bHRzKVxuXG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZChyZXN1bHQpXG4gICAgICAgICAgICB9LCB0aGlzLmVtcHR5LmJpbmQodGhpcykpXG4gICAgICAgIH0sXG4gICAgICAgIG9uTmV4dDogZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgICAgIEFwaS5zaG90c0NoYW5uZWwob2JqZWN0LmlkLCBvYmplY3QucGFnZSwgKHJlc3VsdCk9PntcbiAgICAgICAgICAgICAgICBwbGF5bGlzdCA9IHBsYXlsaXN0LmNvbmNhdChyZXN1bHQucmVzdWx0cylcblxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KVxuICAgICAgICAgICAgfSwgcmVqZWN0LmJpbmQodGhpcykpXG4gICAgICAgIH0sXG4gICAgICAgIG9ubHlDcmVhdGVBbmRBcHBlbmQ6IGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gbmV3IFNob3QoZWxlbWVudCwge1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdDogcGxheWxpc3RcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdpbnN0YW5jZScsIGl0ZW0sIGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaXRlbS5jcmVhdGUoKVxuXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdhcHBlbmQnLCBpdGVtLCBlbGVtZW50KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2goZSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdXYXJuaW5nJywgJ29uQ3JlYXRlQW5kQXBwZW5kIGVycm9yOicsIGUubWVzc2FnZSwgZS5zdGFjaylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25EZXN0cm95OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcGxheWxpc3QgPSBudWxsXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGNvbXBcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50IiwiZnVuY3Rpb24gYmFja3dhcmQoKXtcbiAgICBsZXQgaGVhZCA9IExhbXBhLlRlbXBsYXRlLmdldCgnaGVhZF9iYWNrd2FyZCcse3RpdGxlOiAnJ30pXG5cbiAgICBoZWFkLmZpbmQoJy5oZWFkLWJhY2t3YXJkX19idXR0b24nKS5vbignY2xpY2snLCgpPT57XG4gICAgICAgIExhbXBhLkNvbnRyb2xsZXIuYmFjaygpXG4gICAgfSlcblxuICAgIHJldHVybiBoZWFkXG59XG5cbmZ1bmN0aW9uIFByZXNlbnQoKXtcbiAgICB0aGlzLm9uQ29tcGxldGUgPSAoKT0+e31cbiAgICB0aGlzLm9uQmFjayAgICAgPSAoKT0+e31cblxuICAgIHRoaXMuc3RhcnQgPSBmdW5jdGlvbigpe1xuICAgICAgICBsZXQgbGFzdF90aW1lX3dhdGNoZWQgPSBMYW1wYS5TdG9yYWdlLmdldCgnc2hvdHNfcHJlc2VudF93YXRjaGVkJywgJzAnKVxuICAgICAgICBsZXQgd2FpdF90aW1lID0gMTAwMCAqIDYwICogNjAgKiAyNCAqIDMwIC8vIDUg0LTQvdC10LlcblxuICAgICAgICBpZihEYXRlLm5vdygpIC0gbGFzdF90aW1lX3dhdGNoZWQgPCB3YWl0X3RpbWUpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub25Db21wbGV0ZSgpXG4gICAgICAgIH1cblxuICAgICAgICBMYW1wYS5CYWNrZ3JvdW5kLnRoZW1lKCdibGFjaycpXG5cbiAgICAgICAgdGhpcy5odG1sID0gJChgPGRpdiBjbGFzcz1cInNob3RzLXZpZGVvLXByZXNlbnRcIj5cbiAgICAgICAgICAgIDx2aWRlbyBhdXRvcGxheSBwb3N0ZXI9XCIuL2ltZy92aWRlb19wb3N0ZXIucG5nXCI+PC92aWRlbz5cbiAgICAgICAgPC9kaXY+YClcblxuICAgICAgICBpZihMYW1wYS5QbGF0Zm9ybS5tb3VzZSgpIHx8IExhbXBhLlV0aWxzLmlzVG91Y2hEZXZpY2UoKSl7XG4gICAgICAgICAgICB0aGlzLmh0bWwuYXBwZW5kKGJhY2t3YXJkKCkpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpZGVvID0gdGhpcy5odG1sLmZpbmQoJ3ZpZGVvJylbMF1cblxuICAgICAgICBpZihMYW1wYS5QbGF0Zm9ybS5pcygnYXBwbGUnKSkgdGhpcy52aWRlby5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJ3RydWUnKVxuXG4gICAgICAgIHRoaXMudmlkZW8uc3JjID0gJ2h0dHBzOi8vY2RuLmN1Yi5yaXAvc2hvdHNfcHJlc2VudC9wcmVzZW50Lm1wNCdcblxuICAgICAgICB0aGlzLnZpZGVvLmxvYWQoKVxuXG4gICAgICAgIHRoaXMudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLHRoaXMuc3RvcC5iaW5kKHRoaXMpKVxuXG4gICAgICAgIHRoaXMudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLHRoaXMuc3RvcC5iaW5kKHRoaXMpKVxuXG4gICAgICAgIHRoaXMudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsKCk9PntcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyX3dhaXRlKVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMudGltZXJfd2FpdGUgPSBzZXRUaW1lb3V0KHRoaXMuc3RvcC5iaW5kKHRoaXMpLCA2MDAwKVxuXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQodGhpcy5odG1sKVxuXG4gICAgICAgIExhbXBhLkNvbnRyb2xsZXIuYWRkKCdzaG90c192aWRlb19wcmVzZW50Jyx7XG4gICAgICAgICAgICB0b2dnbGU6ICgpPT57XG4gICAgICAgICAgICAgICAgTGFtcGEuQ29udHJvbGxlci5jbGVhcigpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFjazogdGhpcy5iYWNrLmJpbmQodGhpcylcbiAgICAgICAgfSlcblxuICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnc2hvdHNfdmlkZW9fcHJlc2VudCcpXG4gICAgfVxuXG4gICAgdGhpcy5zdG9wID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5vbkNvbXBsZXRlKClcblxuICAgICAgICBMYW1wYS5TdG9yYWdlLnNldCgnc2hvdHNfcHJlc2VudF93YXRjaGVkJywgRGF0ZS5ub3coKSlcbiAgICB9XG5cbiAgICB0aGlzLmJhY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLm9uQmFjaygpXG4gICAgfVxuICAgIFxuICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuc3RvcCA9ICgpPT57fVxuICAgICAgICB0aGlzLm9uQ29tcGxldGUgPSAoKT0+e31cbiAgICAgICAgdGhpcy5vbkJhY2sgPSAoKT0+e31cblxuICAgICAgICBpZighdGhpcy52aWRlbykgcmV0dXJuXG5cbiAgICAgICAgdGhpcy52aWRlby5wYXVzZSgpXG4gICAgICAgIHRoaXMudmlkZW8uc3JjID0gJydcblxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcl93YWl0ZSlcblxuICAgICAgICB0aGlzLmh0bWwucmVtb3ZlKClcblxuICAgICAgICBMYW1wYS5CYWNrZ3JvdW5kLnRoZW1lKCdyZXNldCcpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcmVzZW50IiwibGV0IGNvbXBvbmVudCA9ICdzaG90cydcbmxldCBpY29uID0gYDxzdmcgaWQ9XCJzcHJpdGUtc2hvdHNcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICA8cGF0aCBkPVwiTTI1My4yNjYgNTEyYTE5LjE2NiAxOS4xNjYgMCAwIDEtMTkuMTY4LTE5LjE2OFYzMzAuNjA3bC0xMzUuMDcxLS4wNDlhMTkuMTY0IDE5LjE2NCAwIDAgMS0xNi44MzItMjguMzJMMjQxLjA2IDEwLjAxM2ExOS4xNjcgMTkuMTY3IDAgMCAxIDM2LjAwNSA5LjE1NHYxNjIuNTM0aDEzNS45MDJhMTkuMTY3IDE5LjE2NyAwIDAgMSAxNi44MTUgMjguMzYzTDI3MC4wNzggNTAyLjAzYTE5LjE3MyAxOS4xNzMgMCAwIDEtMTYuODEyIDkuOTd6XCIgZmlsbD1cIndoaXRlXCI+PC9wYXRoPlxuPC9zdmc+YFxuXG5mdW5jdGlvbiBpbml0KCl7XG4gICAgTGFtcGEuU2V0dGluZ3NBcGkuYWRkQ29tcG9uZW50KHtcbiAgICAgICAgY29tcG9uZW50LFxuICAgICAgICBpY29uLFxuICAgICAgICBuYW1lOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnU2hvdHMnKSxcbiAgICB9KVxuXG4gICAgTGFtcGEuU2V0dGluZ3NBcGkuYWRkUGFyYW0oe1xuICAgICAgICBjb21wb25lbnQsXG4gICAgICAgIHBhcmFtOiB7XG4gICAgICAgICAgICBuYW1lOiAnc2hvdHNfaW5fcGxheWVyJyxcbiAgICAgICAgICAgIHR5cGU6ICd0cmlnZ2VyJyxcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgZmllbGQ6IHtcbiAgICAgICAgICAgIG5hbWU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c19zZXR0aW5nc19pbl9wbGF5ZXInKSxcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBMYW1wYS5TZXR0aW5nc0FwaS5hZGRQYXJhbSh7XG4gICAgICAgIGNvbXBvbmVudCxcbiAgICAgICAgcGFyYW06IHtcbiAgICAgICAgICAgIG5hbWU6ICdzaG90c19pbl9jYXJkJyxcbiAgICAgICAgICAgIHR5cGU6ICd0cmlnZ2VyJyxcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgZmllbGQ6IHtcbiAgICAgICAgICAgIG5hbWU6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c19zZXR0aW5nc19pbl9jYXJkJyksXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5pdFxufSIsImltcG9ydCBMYW5nIGZyb20gJy4vdXRpbHMvbGFuZy5qcydcbmltcG9ydCBUZW1wbGF0ZXMgZnJvbSAnLi91dGlscy90ZW1wbGF0ZXMuanMnXG5pbXBvcnQgUGxheWVyIGZyb20gJy4vdXRpbHMvcGxheWVyLmpzJ1xuaW1wb3J0IEhhbmRsZXIgZnJvbSAnLi91dGlscy9oYW5kbGVyLmpzJ1xuaW1wb3J0IEZhdm9yaXRlIGZyb20gJy4vdXRpbHMvZmF2b3JpdGUuanMnXG5pbXBvcnQgQ3JlYXRlZCBmcm9tICcuL3V0aWxzL2NyZWF0ZWQuanMnXG5pbXBvcnQgU2hvdCBmcm9tICcuL2NvbXBvbmVudHMvc2hvdC5qcydcbmltcG9ydCBMZW50YSBmcm9tICcuL2xlbnRhL2xlbnRhLmpzJ1xuaW1wb3J0IEFwaSBmcm9tICcuL3V0aWxzL2FwaS5qcydcbmltcG9ydCBMaXN0IGZyb20gJy4vY29tcG9uZW50cy9saXN0LmpzJ1xuaW1wb3J0IENhcmQgZnJvbSAnLi9jb21wb25lbnRzL2NhcmQuanMnXG5pbXBvcnQgVmlldyBmcm9tICcuL3V0aWxzL3ZpZXcuanMnXG5pbXBvcnQgQ2hhbm5lbCBmcm9tICcuL2NvbXBvbmVudHMvY2hhbm5lbC5qcydcbmltcG9ydCBQcmVzZW50IGZyb20gJy4vY29tcG9uZW50cy9wcmVzZW50LmpzJ1xuaW1wb3J0IFJvbGwgZnJvbSAnLi91dGlscy9yb2xsLmpzJ1xuaW1wb3J0IFRhZ3MgZnJvbSAnLi91dGlscy90YWdzLmpzJ1xuaW1wb3J0IFNldHRpbmdzIGZyb20gJy4vdXRpbHMvc2V0dGluZ3MuanMnXG5cbmZ1bmN0aW9uIHN0YXJ0UGx1Z2luKCkge1xuICAgIHdpbmRvdy5wbHVnaW5fc2hvdHNfcmVhZHkgPSB0cnVlXG5cbiAgICBmdW5jdGlvbiBpbml0KCl7XG4gICAgICAgIExhbmcuaW5pdCgpXG5cbiAgICAgICAgVGVtcGxhdGVzLmluaXQoKVxuXG4gICAgICAgIFBsYXllci5pbml0KClcblxuICAgICAgICBIYW5kbGVyLmluaXQoKVxuXG4gICAgICAgIFNldHRpbmdzLmluaXQoKVxuXG4gICAgICAgIEZhdm9yaXRlLmluaXQoKVxuXG4gICAgICAgIENyZWF0ZWQuaW5pdCgpXG5cbiAgICAgICAgVmlldy5pbml0KClcblxuICAgICAgICBUYWdzLmxvYWQoKVxuXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoYFxuICAgICAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICAgQEBpbmNsdWRlKCcuLi9wbHVnaW5zL3Nob3RzL2Nzcy9zdHlsZS5jc3MnKVxuICAgICAgICAgICAgPC9zdHlsZT5cbiAgICAgICAgYClcblxuICAgICAgICAvLyDQlNC+0LHQsNCy0LvRj9C10Lwg0LrQvtC80L/QvtC90LXQvdGC0YtcblxuICAgICAgICBMYW1wYS5Db21wb25lbnQuYWRkKCdzaG90c19saXN0JywgTGlzdClcbiAgICAgICAgTGFtcGEuQ29tcG9uZW50LmFkZCgnc2hvdHNfY2FyZCcsIENhcmQpXG4gICAgICAgIExhbXBhLkNvbXBvbmVudC5hZGQoJ3Nob3RzX2NoYW5uZWwnLCBDaGFubmVsKVxuXG4gICAgICAgIC8vINCt0LrRgNCw0L0g0LfQsNC60LvQsNC00L7QuiAtINGI0L7RgtGLXG5cbiAgICAgICAgTGFtcGEuQ29udGVudFJvd3MuYWRkKHtcbiAgICAgICAgICAgIGluZGV4OiAxLFxuICAgICAgICAgICAgc2NyZWVuOiBbJ2Jvb2ttYXJrcyddLFxuICAgICAgICAgICAgY2FsbDogKHBhcmFtcywgc2NyZWVuKT0+e1xuICAgICAgICAgICAgICAgIGxldCBmYXZvdGl0ZSA9IEZhdm9yaXRlLmdldCgpXG4gICAgICAgICAgICAgICAgbGV0IGNyZWF0ZWQgID0gQ3JlYXRlZC5nZXQoKVxuICAgICAgICAgICAgICAgIGxldCBsaW5lcyAgICA9IFtdXG4gICAgICAgICAgICAgICAgbGV0IG9ubW9yZSAgID0ge1xuICAgICAgICAgICAgICAgICAgICBlbWl0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vcmU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuQWN0aXZpdHkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdGhpcy5kYXRhLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmRhdGEudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogJ3Nob3RzX2xpc3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlOiAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIExhbXBhLlV0aWxzLmV4dGVuZEl0ZW1zUGFyYW1zKGZhdm90aXRlLCB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUluc3RhbmNlOiAoaXRlbV9kYXRhKT0+IFNob3QoaXRlbV9kYXRhLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdDogZmF2b3RpdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbk5leHQ6IChwYWdlLCBjYWxsKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZhdm9yaXRlLnBhZ2UocGFnZSwgY2FsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgTGFtcGEuVXRpbHMuZXh0ZW5kSXRlbXNQYXJhbXMoY3JlYXRlZCwge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVJbnN0YW5jZTogKGl0ZW1fZGF0YSk9PiBTaG90KGl0ZW1fZGF0YSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWxpc3Q6IGNyZWF0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbk5leHQ6IChwYWdlLCBjYWxsKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENyZWF0ZWQucGFnZShwYWdlLCBjYWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBpZihmYXZvdGl0ZS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnc2hvdHNfdGl0bGVfZmF2b3JpdGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IGZhdm90aXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Zhdm9yaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsX3BhZ2VzOiBmYXZvdGl0ZS5sZW5ndGggPj0gMjAgPyAyIDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogb25tb3JlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoY3JlYXRlZC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnc2hvdHNfdGl0bGVfY3JlYXRlZCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0czogY3JlYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjcmVhdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsX3BhZ2VzOiBjcmVhdGVkLmxlbmd0aCA+PSAyMCA/IDIgOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBvbm1vcmVcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihsaW5lcy5sZW5ndGgpIHJldHVybiBsaW5lc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vINCT0LvQsNCy0L3Ri9C5INGN0LrRgNCw0L0gLSDRiNC+0YLRi1xuXG4gICAgICAgIExhbXBhLkNvbnRlbnRSb3dzLmFkZCh7XG4gICAgICAgICAgICBuYW1lOiAnc2hvdHNfbWFpbicsXG4gICAgICAgICAgICB0aXRsZTogJ1Nob3RzJyxcbiAgICAgICAgICAgIGluZGV4OiAyLFxuICAgICAgICAgICAgc2NyZWVuOiBbJ21haW4nXSxcbiAgICAgICAgICAgIGNhbGw6IChwYXJhbXMsIHNjcmVlbik9PntcbiAgICAgICAgICAgICAgICBpZihMYW1wYS5BY2NvdW50LlBlcm1pdC5jaGlsZCkgcmV0dXJuXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oY2FsbCl7XG4gICAgICAgICAgICAgICAgICAgIEFwaS5sZW50YSh7c29ydDogJ25ldyd9LCAoc2hvdHMpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5VdGlscy5leHRlbmRJdGVtc1BhcmFtcyhzaG90cywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUluc3RhbmNlOiAoaXRlbV9kYXRhKT0+IFNob3QoaXRlbV9kYXRhLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0OiBzaG90cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25OZXh0OiAocGFnZSwgY2FsbCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFwaS5sZW50YSh7c29ydDogJ25ldycsIHBhZ2U6IHBhZ2V9LCBjYWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnU2hvdHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IHNob3RzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdmYXZvcml0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxfcGFnZXM6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbl9zdmc6ICc8c3ZnPjx1c2UgeGxpbms6aHJlZj1cIiNzcHJpdGUtc2hvdHNcIj48L3VzZT48L3N2Zz4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25fYmdjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25fY29sb3I6ICcjZmQ0NTE4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlOiBMYW1wYS5NYWtlci5tb2R1bGUoJ0xpbmUnKS50b2dnbGUoTGFtcGEuTWFrZXIubW9kdWxlKCdMaW5lJykuTUFTSy5iYXNlLCAnSWNvbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8g0JrQvdC+0L/QutCwINCyINC80LXQvdGOXG5cbiAgICAgICAgbGV0IHdhaXRpbmcgPSBmYWxzZVxuXG4gICAgICAgIExhbXBhLk1lbnUuYWRkQnV0dG9uKCc8c3ZnPjx1c2UgeGxpbms6aHJlZj1cIiNzcHJpdGUtc2hvdHNcIj48L3VzZT48L3N2Zz4nLCAnU2hvdHMnLCAoKT0+e1xuICAgICAgICAgICAgbGV0IHByZXNlbnQgPSBuZXcgUHJlc2VudCgpXG5cbiAgICAgICAgICAgIHByZXNlbnQub25Db21wbGV0ZSA9ICgpPT57XG4gICAgICAgICAgICAgICAgcHJlc2VudC5vbkJhY2sgPSAoKT0+e31cblxuICAgICAgICAgICAgICAgIGlmKHdhaXRpbmcpIHJldHVyblxuXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX3dhdGNoX3JvbGwnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdjb250ZW50JylcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhaXRpbmcgPSB0cnVlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FsbCA9IChzaG90cyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuTG9hZGluZy5zdG9wKClcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVzZW50LmRlc3Ryb3koKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhaXRpbmcgPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNob3RzLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBMYW1wYS5CZWxsLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICc8c3ZnPjx1c2UgeGxpbms6aHJlZj1cIiNzcHJpdGUtc2hvdHNcIj48L3VzZT48L3N2Zz4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IExhbXBhLkxhbmcudHJhbnNsYXRlKCdzaG90c19hbGVydF9ub3Nob3RzJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGVudGEgPSBuZXcgTGVudGEoc2hvdHNbMF0sIHNob3RzKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbnRhLm9uTmV4dCA9IChwYWdlLCBjYWxsKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUm9sbC5uZXh0KGNhbGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW50YS5zdGFydCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTGFtcGEuTG9hZGluZy5zdGFydCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWl0aW5nID0gZmFsc2VcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVzZW50LmRlc3Ryb3koKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGwgPSAoKT0+e31cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Mb2FkaW5nLnN0b3AoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSb2xsLnN0YXJ0KGNhbGwpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnc2hvdHNfY2hvb3NlX3RhZ3Nfc2VsZWN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXBhcmF0b3I6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG5cbiAgICAgICAgICAgICAgICBUYWdzLmxpc3QoKS5mb3JFYWNoKHRhZz0+e1xuICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0YWcudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWc6IHRhZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogTGFtcGEuTGFuZy50cmFuc2xhdGUoJ3Nob3RzX3dhdGNoX3RhZ3MnKSxcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnY29udGVudCcpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZF90YWdzID0gaXRlbXMuZmlsdGVyKGE9PmEuY2hlY2tlZCAmJiBhLnRhZykubWFwKGE9PmEudGFnKVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhZ3Nfc2x1ZyAgICAgPSBzZWxlY3RlZF90YWdzLm1hcCh0PT50LnNsdWcpLmpvaW4oJywnKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxlY3RlZF90YWdzLmxlbmd0aCA9PSAwKSByZXR1cm4gTGFtcGEuQmVsbC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnPHN2Zz48dXNlIHhsaW5rOmhyZWY9XCIjc3ByaXRlLXNob3RzXCI+PC91c2U+PC9zdmc+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnc2hvdHNfYWxlcnRfbm9fdGFncycpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBBcGkubGVudGEoe3RhZ3M6IHRhZ3Nfc2x1Z30sIChzaG90cyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzaG90cy5sZW5ndGggPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBMYW1wYS5CZWxsLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJzxzdmc+PHVzZSB4bGluazpocmVmPVwiI3Nwcml0ZS1zaG90c1wiPjwvdXNlPjwvc3ZnPicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnc2hvdHNfYWxlcnRfbm9zaG90cycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxlbnRhID0gbmV3IExlbnRhKHNob3RzWzBdLCBzaG90cylcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbnRhLm9uTmV4dCA9IChwYWdlLCBjYWxsKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcGkubGVudGEoe3RhZ3M6IHRhZ3Nfc2x1ZywgcGFnZTogcGFnZX0sIGNhbGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVudGEuc3RhcnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBMYW1wYS5TZWxlY3Quc2hvdyh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBMYW1wYS5MYW5nLnRyYW5zbGF0ZSgnU2hvdHMnKSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IGl0ZW1zLFxuICAgICAgICAgICAgICAgICAgICBvbkJhY2s6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBMYW1wYS5Db250cm9sbGVyLnRvZ2dsZSgnY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcmVzZW50Lm9uQmFjayA9ICgpPT57XG4gICAgICAgICAgICAgICAgcHJlc2VudC5kZXN0cm95KClcblxuICAgICAgICAgICAgICAgIExhbXBhLkNvbnRyb2xsZXIudG9nZ2xlKCdjb250ZW50JylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJlc2VudC5zdGFydCgpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYoTGFtcGEuTWFuaWZlc3QuYXBwX2RpZ2l0YWwgPj0gMzA3KXtcbiAgICAgICAgaWYod2luZG93LmFwcHJlYWR5KSBpbml0KClcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIExhbXBhLkxpc3RlbmVyLmZvbGxvdygnYXBwJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS50eXBlID09ICdyZWFkeScpIGluaXQoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuaWYoIXdpbmRvdy5wbHVnaW5fc2hvdHNfcmVhZHkgJiYgTGFtcGEuTGFuZy5zZWxlY3RlZChbJ3J1JywndWsnLCdiZSddKSkgc3RhcnRQbHVnaW4oKSJdLCJuYW1lcyI6WyJpbml0IiwiTGFtcGEiLCJMYW5nIiwiYWRkIiwiZW1wdHkiLCJydSIsImVuIiwidWsiLCJiZSIsInpoIiwicHQiLCJiZyIsInJvIiwic2hvdHNfbW9kYWxfYmVmb3JlX3JlY29yZGluZ190eHRfMSIsInNob3RzX21vZGFsX2JlZm9yZV9yZWNvcmRpbmdfdHh0XzIiLCJzaG90c19zdGVwIiwic2hvdHNfc3RhcnRfcmVjb3JkaW5nIiwic2hvdHNfY2hvaWNlX3N0YXJ0X3BvaW50Iiwic2hvdHNfbW9kYWxfYnV0dG9uX3VwbG9hZF9zdGFydCIsInNob3RzX21vZGFsX2J1dHRvbl91cGxvYWRfY2FuY2VsIiwic2hvdHNfbW9kYWxfYnV0dG9uX3VwbG9hZF9hZ2FpbiIsInNob3RzX21vZGFsX2J1dHRvbl91cGxvYWRfY29tcGxldGUiLCJzaG90c19tb2RhbF9zaG9ydF9yZWNvcmRpbmdfdHh0Iiwic2hvdHNfdXBsb2FkX3Byb2dyZXNzX3N0YXJ0Iiwic2hvdHNfdXBsb2FkX3Byb2dyZXNzX3VwbG9hZGluZyIsInNob3RzX3VwbG9hZF9wcm9ncmVzc19ub3RpZnkiLCJzaG90c191cGxvYWRfY29tcGxldGVfdGV4dCIsInNob3RzX3VwbG9hZF9jb21wbGV0ZV9ub3RpZnkiLCJzaG90c191cGxvYWRfZXJyb3Jfbm90aWZ5Iiwic2hvdHNfdXBsb2FkX25vdGljZV90ZXh0Iiwic2hvdHNfdGl0bGVfZmF2b3JpdGUiLCJzaG90c190aXRsZV9jcmVhdGVkIiwic2hvdHNfdGl0bGVfbGlrZXMiLCJzaG90c190aXRsZV9zYXZlZCIsInNob3RzX3N0YXR1c19lcnJvciIsInNob3RzX3N0YXR1c19wcm9jZXNzaW5nIiwic2hvdHNfc3RhdHVzX3JlYWR5Iiwic2hvdHNfc3RhdHVzX2Jsb2NrZWQiLCJzaG90c19zdGF0dXNfZGVsZXRlZCIsInNob3RzX21vZGFsX2Vycm9yX3JlY29yZGluZ190eHRfMSIsInNob3RzX21vZGFsX2Vycm9yX3JlY29yZGluZ190eHRfMiIsInNob3RzX2J1dHRvbl9nb29kIiwic2hvdHNfYnV0dG9uX3JlcG9ydCIsInNob3RzX2J1dHRvbl9kZWxldGVfdmlkZW8iLCJzaG90c19tb2RhbF9yZXBvcnRfdHh0XzEiLCJzaG90c19tb2RhbF9yZXBvcnRfdHh0XzIiLCJzaG90c19tb2RhbF9yZXBvcnRfdHh0XzMiLCJzaG90c19tb2RhbF9yZXBvcnRfYmVsbCIsInNob3RzX21vZGFsX3JlcG9ydF9iZWxsX2FscmVhZHllZCIsInNob3RzX21vZGFsX2RlbGV0ZWRfYmVsbCIsInNob3RzX21vZGFsX2RlbGV0ZV90eHRfMSIsInNob3RzX21vZGFsX2RlbGV0ZV90eHRfMiIsInNob3RzX21vZGFsX3F1b3RhX3R4dF8xIiwic2hvdHNfbW9kYWxfcXVvdGFfdHh0XzIiLCJzaG90c19tb2RhbF9iZWZvcmVfdXBsb2FkX3JlY29yZGluZ190eHRfMSIsInNob3RzX21vZGFsX2JlZm9yZV91cGxvYWRfcmVjb3JkaW5nX3R4dF8yIiwic2hvdHNfYnV0dG9uX2Nob2ljZV9mcmFnbWVudCIsInNob3RzX2J1dHRvbl9jb250aW51ZV91cGxvYWQiLCJzaG90c19yZWNvcmRpbmdfdGV4dCIsInNob3RzX3dhdGNoIiwic2hvdHNfZG93biIsInNob3RzX2hvd19jcmVhdGVfdmlkZW9fdGl0bGUiLCJzaG90c19ob3dfY3JlYXRlX3ZpZGVvX3N1YnRpdGxlIiwic2hvdHNfY2FyZF9lbXB0eV9kZXNjciIsInNob3RzX2FsZXJ0X25vc2hvdHMiLCJzaG90c19jaG9pY2VfdGFncyIsInNob3RzX3RhZ19hY3Rpb24iLCJzaG90c190YWdfY29tZWR5Iiwic2hvdHNfdGFnX2RyYW1hIiwic2hvdHNfdGFnX2hvcnJvciIsInNob3RzX3RhZ190aHJpbGxlciIsInNob3RzX3RhZ19hbmltZSIsInNob3RzX3RhZ19mYW50YXN5Iiwic2hvdHNfdGFnX3NjaV9maSIsInNob3RzX3NldHRpbmdzX2luX3BsYXllciIsInNob3RzX3NldHRpbmdzX2luX2NhcmQiLCJzaG90c193YXRjaF9yb2xsIiwic2hvdHNfY2hvb3NlX3RhZ3Nfc2VsZWN0Iiwic2hvdHNfd2F0Y2hfdGFncyIsInNob3RzX2FsZXJ0X25vX3RhZ3MiLCJzaG90c19wbGF5ZXJfcmVjb3JkZXJfcmV3aW5kX3RleHQiLCJzaG90c19wbGF5ZXJfcmVjb3JkZXJfZm9yd2FyZF90ZXh0Iiwic2hvdHNfcGxheWVyX3JlY29yZGVyX3N0b3BfdGV4dCIsIlRlbXBsYXRlIiwic3ByaXRlcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImlubmVySFRNTCIsInZpZGVvU2NyZWVuU2hvdCIsInZpZGVvIiwic2NyZWVuX3dpZHRoIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiY2FudmFzIiwiY3JlYXRlRWxlbWVudCIsImNvbnRleHQiLCJnZXRDb250ZXh0Iiwic2NhbGUiLCJ2aWRlb1dpZHRoIiwid2lkdGgiLCJNYXRoIiwicm91bmQiLCJoZWlnaHQiLCJ2aWRlb0hlaWdodCIsImRyYXdJbWFnZSIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwidG9EYXRhVVJMIiwidmlkZW9SZXBsYWNlU3RhdHVzIiwiZnJvbSIsInRvIiwic3RhdHVzIiwic2NyZWVuIiwiZmlsZSIsImdldEJhbGFuc2VyIiwiY2FyZCIsImhpc3RvcnlfZGF0YSIsIlN0b3JhZ2UiLCJnZXQiLCJoaXN0b3J5X2tleSIsIlV0aWxzIiwiaGFzaCIsIm5hbWUiLCJvcmlnaW5hbF9uYW1lIiwib3JpZ2luYWxfdGl0bGUiLCJoaXN0b3J5X2l0ZW0iLCJiYWxhbnNlciIsInNob3J0Vm9pY2UiLCJ2b2ljZSIsInJlcGxhY2UiLCJ0cmltIiwiaXNUU1F1YWxpdHkiLCJzdHIiLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJtb2RhbCIsImh0bWwiLCJidXR0b25zIiwiYmFjayIsImJvZHkiLCIkIiwiZm9vdGVyIiwiYXBwZW5kIiwiZm9yRWFjaCIsImJ1dHRvbiIsImJ0biIsInRleHQiLCJvbiIsIm9uU2VsZWN0IiwiY2FuY2VsIiwiYWRkQ2xhc3MiLCJNb2RhbCIsIm9wZW4iLCJzaXplIiwic2Nyb2xsIiwibm9wYWRkaW5nIiwib25CYWNrIiwicXVvdGFfbmV4dF9yZWNvcmQiLCJ2aWRlb19zaXplIiwic2NyZWVuX3NpemUiLCJyZWNvcmRlcl9tYXhfZHVyYXRpb24iLCJjZG4iLCJjb3VudGVyIiwibWV0aG9kIiwidjEiLCJ2MiIsInYzIiwiYWpheCIsImRhdGFUeXBlIiwidXJsIiwicHJvdG9jb2wiLCJNYW5pZmVzdCIsImN1Yl9kb21haW4iLCJSZWNvcmRlciIsInN0YXJ0X3BvaW50IiwiY3VycmVudFRpbWUiLCJzdGFydCIsIk1ldHJpYyIsInNjcmVlbnNob3QiLCJEZWZpbmVkIiwicnVuIiwiX3RoaXMiLCJidXR0b25fc3RvcCIsImZpbmQiLCJidXR0b25fZm9yd2FyZCIsImJ1dHRvbl9yZXdpbmQiLCJzdG9wIiwiYmluZCIsInRpayIsIkNvbnRyb2xsZXIiLCJ0b2dnbGUiLCJjb2xsZWN0aW9uU2V0IiwiY29sbGVjdGlvbkZvY3VzIiwibGVmdCIsIk5hdmlnYXRvciIsIm1vdmUiLCJyaWdodCIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJvblJ1biIsInNlY29uZHMiLCJwcm9ncmVzcyIsInNlY29uZHNUb1RpbWUiLCJzcGxpdCIsInNlY29uZHNUb1RpbWVIdW1hbiIsImRlc3Ryb3kiLCJvbkVycm9yIiwiZWxhcHNlZCIsIkVycm9yIiwib25TdG9wIiwiZHVyYXRpb24iLCJlbmRfcG9pbnQiLCJjbGVhckludGVydmFsIiwicmVtb3ZlIiwiVGFncyIsInRhZ3NfZGF0YSIsImNyZWF0ZSIsInVwZGF0ZSIsImRhdGEiLCJ0YWdzIiwic2Vhc29uIiwicHVzaCIsImVwaXNvZGUiLCJ2b2ljZV9uYW1lIiwiY2FyZF90aXRsZSIsIm1hcCIsInRhZyIsImpvaW4iLCJyZW5kZXIiLCJQcmV2aWV3IiwicmVjb3JkaW5nIiwiY3NzIiwib3BhY2l0eSIsImVxIiwic3JjIiwicmVsZWFzZV9kYXRlIiwicGxheV9kYXRhIiwiZmlyc3RfYWlyX2RhdGUiLCJ5ZWFyIiwic2xpY2UiLCJ0aXRsZSIsIkNoZWNrYm94IiwicGFyYW1zIiwic3RhdGUiLCJzZXRUZXh0Iiwic2V0U3RhdGUiLCJ0b2dnbGVDbGFzcyIsInUiLCJ0aW1lb3V0IiwiQWNjb3VudCIsIlBlcm1pdCIsImFjY291bnQiLCJ0b2tlbiIsImhlYWRlcnMiLCJwcm9maWxlIiwiaWQiLCJ1cGxvYWRSZXF1ZXN0Iiwib25zdWNjZXNzIiwib25lcnJvciIsIk5ldHdvcmsiLCJzaWxlbnQiLCJ1cGxvYWRTdGF0dXMiLCJzaG90c1ZpZGVvIiwic2hvdHNMaXN0IiwidHlwZSIsInBhZ2UiLCJzaG90c0NhcmQiLCJzaG90c0NoYW5uZWwiLCJzaG90c0xpa2VkIiwidWlkIiwic2hvdHNCbG9jayIsInNob3RzUmVwb3J0Iiwic2hvdHNEZWxldGUiLCJzaG90c0Zhdm9yaXRlIiwiYWN0aW9uIiwic2hvdCIsInNpZCIsImNhcmRfcG9zdGVyIiwibGVudGEiLCJxdWVyeSIsIkFycmF5cyIsImV4dGVuZCIsInNvcnQiLCJsaW1pdCIsInBhdGgiLCJrZXkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJyZXN1bHQiLCJyZXN1bHRzIiwic2hvdHNWaWV3ZWQiLCJQcm9ncmVzcyIsInNldFByb2dyZXNzIiwicGVyY2VudCIsInJlbW92ZUNsYXNzIiwic2hvdHMiLCJUaW1lciIsImkiLCJjaGVjayIsIkFwaSIsImpzb24iLCJCZWxsIiwiaWNvbiIsInRyYW5zbGF0ZSIsIkxpc3RlbmVyIiwic2VuZCIsIl9vYmplY3RTcHJlYWQiLCJjcmVhdGVkIiwiZm9sbG93IiwidXBkYXRlU3RhdHVzIiwidXBkYXRlRGF0YSIsInRhcmdldCIsInJlYXNvbiIsIlNvY2tldCIsImxpc3RlbmVyIiwibGlzdCIsImEiLCJzZXQiLCJsaWtlZCIsInNhdmVkIiwiY2xvbmUiLCJPYmplY3QiLCJhc3NpZ24iLCJpbnNlcnQiLCJmaW5kX2luIiwiY2FsbGJhY2siLCJCb29sZWFuIiwiU2VsZWN0b3IiLCJzZWxlY3RlZCIsInQiLCJzbHVnIiwibG9hZCIsIlVwbG9hZCIsInByZXZpZXciLCJjaGVja2JveCIsInNlbGVjdG9yX3RpdGxlIiwic2VsZWN0b3IiLCJidXR0b25fdXBsb2FkIiwiYnV0dG9uX2NhbmNlbCIsImJ1dHRvbl9hZ2FpbiIsImJ1dHRvbl9jb21wbGV0ZSIsInRleHRfY29tcGxldGUiLCJ0ZXh0X25vdGljZSIsInN0YXJ0VXBsb2FkIiwib25Db21wbGV0ZSIsInNob3RfcmVhZHkiLCJjYW5jZWxVcGxvYWQiLCJzZXRGb2N1cyIsImNsZWFyIiwicGxheSIsImNhcmRfaWQiLCJjYXJkX3R5cGUiLCJjYXJkX3llYXIiLCJwb3N0ZXJfcGF0aCIsInJlY29yZGVyIiwiZW5kVXBsb2FkIiwiZXJyb3JVcGxvYWQiLCJ1cGxvYWQiLCJEYXRlIiwibm93IiwiQ3JlYXRlZCIsIkhhbmRsZXIiLCJ1cGxvYWRpbmciLCJhYm9ydCIsIm9uQ2FuY2VsIiwiY2xvc2UiLCJydW5VcGxvYWQiLCJub3RpZnlVcGxvYWQiLCJsb2FkZWRfc2hvdHMiLCJmaWVsZCIsIm1vdiIsIm1vdmllIiwiQWN0aXZpdHkiLCJjb21wb25lbnQiLCJsb2ciLCJhdHRyIiwib2JqZWN0IiwiYWN0aXZpdHkiLCJsYXN0IiwiYWZ0ZXIiLCJjYWxsIiwiYnV0dG9uX3JlY29yZCIsInBsYXllcl9zaG90cyIsIlBsYXllciIsInN0YXJ0UGxheWVyIiwic3RvcFBsYXllciIsImJlZm9yZVJlY29yZGluZyIsIlBsYXllclBhbmVsIiwiUGxhdGZvcm0iLCJtb3VzZSIsImlzVG91Y2hEZXZpY2UiLCJwbGF5ZXJQYW5lbCIsIl9wbGF5X2RhdGEkY2FyZCIsImFjdGl2ZSIsInBvc3NpYmx5IiwiaXB0diIsInlvdXR1YmUiLCJzZXRUaW1lb3V0IiwicGFyc2VJbnQiLCJwbGF5ZXJfdGl0bGUiLCJwbGF5ZGF0YSIsInRvcnJlbnRfaGFzaCIsInNvdXJjZSIsInBsYXllclNob3RzU2VnbWVudHMiLCJuZWVkX3RvY29udGVudCIsIlBsYXllclZpZGVvIiwiYWRkRXZlbnRMaXN0ZW5lciIsIlZpZXciLCJvcGVuZWQiLCJmaWx0ZXIiLCJzIiwiX3NvcnRlZCIsImIiLCJOdW1iZXIiLCJfbGFzdF9lbmQiLCJJbmZpbml0eSIsImVuZCIsIm1heCIsImVsZW0iLCJzZWdtZW50IiwicGljdHVyZSIsImltZyIsImJlZm9yZSIsInBsYXlQbGF5ZXIiLCJ2aXNpYmxlIiwiaGlkZSIsInBhdXNlUGxheWVyIiwicGF1c2UiLCJjbG9zZU1vZGFsIiwidGltZSIsInN0YXJ0UmVjb3JkaW5nIiwic3RvcFJlY29yZGluZyIsImVycm9yUmVjb3JkaW5nIiwibmVhcl9ib3JkZXIiLCJzdGFydFVwbG9hZFJlY29yZGluZyIsInNob3J0UmVjb3JkaW5nIiwiZmF2b3JpdGUiLCJjcmVhdGVNYXAiLCJhcnIiLCJzaG90X2lkIiwiZmluZGVkIiwibG9hZGVkX2xhc3QiLCJTdGF0dXMiLCJvbkNvbXBsaXRlIiwicG9wdWxhciIsImZpbHRlclZpZXdlZCIsIm9sZCIsIml0ZW1zIiwiY29uY2F0Iiwic2h1ZmZsZSIsImZyb21faWQiLCJmaWx0ZXJSZWxldmFudCIsInZpZXdlZCIsImNhY2hlIiwiZmlsdHJlZCIsIm5leHQiLCJ2aWV3ZWRSZWdpc3RlciIsInNhdmVGcm9tSWQiLCJWaWRlbyIsImpzIiwibGF5ZXIiLCJsb2FkZXIiLCJzdHlsZSIsIlJvbGwiLCJTY3JlZW5zYXZlciIsInJlc2V0VGltZXIiLCJzaG93TG9hZGluZyIsImhpZGVMb2FkaW5nIiwicGF1c2VkIiwiaXMiLCJzZXRBdHRyaWJ1dGUiLCJjaGFuZ2UiLCJwbGF5UHJvbWlzZSIsInRoZW4iLCJwYXVzZVByb21pc2UiLCJfdGhpczIiLCJ0aW1lcl9sb2FkaW5nIiwiY2xlYXJUaW1lb3V0IiwiQXV0aG9yIiwiYXV0aG9yX2RhdGEiLCJib3giLCJvbmxvYWQiLCJlbWFpbCIsImNhcGl0YWxpemVGaXJzdExldHRlciIsInJlcG9ydHMiLCJkZWxldGVkIiwiYmFja3dhcmQiLCJoZWFkIiwiU2xpZGVzIiwiYnV0dG9uX3RleHQiLCJzbGlkZXMiLCJzbGlkZV9kYXRhIiwic2xpZGVfaW5kZXgiLCJzbGlkZSIsInRvdGFsIiwidGltZWxvYWQiLCJkb3duIiwiaW5zdGFsbCIsIm9uSW5zdGFsbCIsIkxvYWRpbmciLCJCYWNrZ3JvdW5kIiwidGhlbWUiLCJlbnRlciIsInByZWxvYWQiLCJzbGlkZXNfbG9hZGVkIiwib25Mb2FkIiwiUGFuZWwiLCJuZXR3b3JrIiwiUmVndWVzdCIsImltYWdlIiwiY2FyZGJveCIsInBvc3RlciIsImF1dGhvciIsIndhaXRlX2xpa2UiLCJ3YWl0ZV9mYXYiLCJBcnJheSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJMaWtlcyIsInJlYWR5IiwiRmF2b3JpdGUiLCJjaWQiLCJtZW51IiwiY29udHJvbGxlciIsImVuYWJsZWQiLCJsaW5rIiwiTW9kYWxzIiwic2VwYXJhdG9yIiwic3VidGl0bGUiLCJTZWxlY3QiLCJzaG93IiwiZWxlbV90YWdzIiwiZWxlbV9saWtlcyIsImJpZ051bWJlclRvU2hvcnQiLCJlbGVtX3NhdmVkIiwibG9hZERvbmUiLCJUTURCIiwiYXBpIiwiYmFja2Ryb3BfcGF0aCIsInNob3dfdGltZW91dCIsIkxlbnRhIiwiZmlyc3QiLCJwbGF5bGlzdCIsImN1cnJlbnQiLCJwb3NpdGlvbiIsInBhbmVsIiwiZm9jdXMiLCJfc2VsZiIsIm1vdmVzdGFydCIsInN0YXJ0X3Bvc2l0aW9uIiwiY2xpZW50WSIsImVuZF9wb3NpdGlvbiIsIm1vdmVfcG9zaXRpb24iLCJ0aW1lX3Njcm9sbCIsImRlbHRhIiwiZWxlbW1vdmUiLCJ0cmFuc2Zvcm0iLCJtb3ZlZW5kIiwidGhyZXNob2xkIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJjc3JvbGxfc3BlZWQiLCJ0b3VjaGVzIiwiY2hhbmdlZFRvdWNoZXMiLCJ3aGVlbCIsIndoZWVsRGVsdGEiLCJmb2N1c190aW1lb3V0IiwidXAiLCJjYW5tb3ZlIiwiZGlyZWN0aW9uIiwibmV4dFBhcnQiLCJfdGhpczMiLCJvbk5leHQiLCJsb2FkaW5nX3BhcnQiLCJwIiwiU2hvdCIsIml0ZW1fZGF0YSIsIml0ZW0iLCJNYWtlciIsIm1ha2UiLCJtb2R1bGUiLCJvbmx5IiwidXNlIiwib25DcmVhdGUiLCJ3aXRob3V0X2NhcmQiLCJ1cGRhdGVTdGF0dXNIYW5kbGVyIiwiZW1pdCIsInVwZGF0ZURhdGFIYW5kbGVyIiwib25seUVudGVyIiwib25seUZvY3VzIiwib25SZW1vdmUiLCJleHRlbmRQYXJhbXMiLCJjb2xzIiwiY29tcCIsIk1BU0siLCJiYXNlIiwiYnVpbGQiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25seUNyZWF0ZUFuZEFwcGVuZCIsImVsZW1lbnQiLCJ3YXJuIiwic3RhY2siLCJvbkRlc3Ryb3kiLCJkZXNjciIsIm9uRW50ZXIiLCJQcmVzZW50IiwibGFzdF90aW1lX3dhdGNoZWQiLCJ3YWl0X3RpbWUiLCJ0aW1lcl93YWl0ZSIsIlNldHRpbmdzQXBpIiwiYWRkQ29tcG9uZW50IiwiYWRkUGFyYW0iLCJwYXJhbSIsInN0YXJ0UGx1Z2luIiwicGx1Z2luX3Nob3RzX3JlYWR5IiwiVGVtcGxhdGVzIiwiU2V0dGluZ3MiLCJDb21wb25lbnQiLCJMaXN0IiwiQ2FyZCIsIkNoYW5uZWwiLCJDb250ZW50Um93cyIsImluZGV4IiwiZmF2b3RpdGUiLCJsaW5lcyIsIm9ubW9yZSIsIm9uTW9yZSIsImV4dGVuZEl0ZW1zUGFyYW1zIiwiY3JlYXRlSW5zdGFuY2UiLCJ0b3RhbF9wYWdlcyIsImNoaWxkIiwiaWNvbl9zdmciLCJpY29uX2JnY29sb3IiLCJpY29uX2NvbG9yIiwid2FpdGluZyIsIk1lbnUiLCJhZGRCdXR0b24iLCJwcmVzZW50Iiwic2VsZWN0ZWRfdGFncyIsImNoZWNrZWQiLCJ0YWdzX3NsdWciLCJhcHBfZGlnaXRhbCIsImFwcHJlYWR5Il0sIm1hcHBpbmdzIjoiOzs7SUFBQSxTQUFTQSxNQUFJQSxHQUFFO01BQ1hDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDQyxHQUFHLENBQUM7UUFDWEMsS0FBSyxFQUFFO1VBQ0hDLEVBQUUsRUFBRSxFQUFFO1VBQ05DLEVBQUUsRUFBRSxFQUFFO1VBQ05DLEVBQUUsRUFBRSxFQUFFO1VBQ05DLEVBQUUsRUFBRSxFQUFFO1VBQ05DLEVBQUUsRUFBRSxFQUFFO1VBQ05DLEVBQUUsRUFBRSxFQUFFO1VBQ05DLEVBQUUsRUFBRSxF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