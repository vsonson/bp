package com.balanceposition.app.cucumber.stepdefs;

import com.balanceposition.app.BalancepositionApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = BalancepositionApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
