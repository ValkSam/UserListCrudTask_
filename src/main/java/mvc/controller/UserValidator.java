package mvc.controller;

import entity.User;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Created by Valk on 13.08.15.
 */
@Component
public class UserValidator implements Validator {
    public boolean supports(Class<?> aClass) {
        return true;
        //return User.class.isAssignableFrom(aClass); //если валидуруемый объект - это User
        //сначала думал, что , если вернет false, то оъект не будет валидироваться. На самом деле:
        //если валидатор ЕСТЬ, и ЕСТЬ объект валидации, то он ДОЛЖЕН отработать т.е. supports = false вызовет ошибку
        //при чем это касается каждого подключенного валидатора. Т.е. думать, что supports одного валидатора вернет false,
        //а какого-либо другого (из числа добавленных) - true, и все будет Ок - не верно.
        //Объекты, которые добавляэтся в модель ( modelAndView.addObject(объект) ) будут проходить валидацию
        //И выходит , что для них должен быть отдельный валидатор. А если  не хочу проверять его?
        //как вариант - supports = true. А уже в public void validate - там разобраться кто есть кто (isInstance), и кого не надо проверять - просто ничего не делать
        // ....
        //да, нет. ...  если return true;, то validate не обязазательно будет вызван. Может только для помеченных @Valid ?
        // Но тогда зачем весь сыр-бор с проверко supports ?
        //и чего реагирует  именно на modelAndView.addObject("userPage", userPage);
        //а на modelAndView.addObject("listOfUsers", userList); -  нет
        // Надо поразбираться
    }

    public void validate(Object o, Errors errors) {
        User user = (User)o;
        if (user.getName().length()<3){ //минимальное кол-во символов - 3
            errors.reject("name_err", "1");
        }
        if (user.getName().length()>25){ //max кол-во символов - 25
            errors.reject("name_err", "2");
        }
        if (user.getAge()<5){ //мин возраст
            errors.reject("age_err", "1");
        }
        if (user.getAge()>100){ //max возраст
            errors.reject("age_err", "2");
        }
    }
}
